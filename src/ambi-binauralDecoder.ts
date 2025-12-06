////////////////////////////////////////////////////////////////////
//  Archontis Politis
//  archontis.politis@aalto.fi
//  David Poirier-Quinot
//  davipoir@ircam.fr
////////////////////////////////////////////////////////////////////
//
//  JSAmbisonics a JavaScript library for higher-order Ambisonics
//  The library implements Web Audio blocks that perform
//  typical ambisonic processing operations on audio signals.
//
////////////////////////////////////////////////////////////////////

//////////////////////////
/* HOA BINAURAL DECODER */
//////////////////////////

import {
  type InitializableProcessor,
  getAmbisonicChannelCount,
} from './types';

export default class binDecoder implements InitializableProcessor {
  readonly ctx: AudioContext;
  readonly order: number;
  readonly nCh: number;
  readonly in: ChannelSplitterNode;
  readonly out: ChannelMergerNode;

  initialized: boolean;

  private decFilters: AudioBuffer[];
  private decFilterNodes: ConvolverNode[];
  private gainMid: GainNode;
  private gainSide: GainNode;
  private invertSide: GainNode;

  constructor(audioCtx: AudioContext, order: number) {
    this.initialized = false;

    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.decFilters = new Array(this.nCh);
    this.decFilterNodes = new Array(this.nCh);

    // input and output nodes
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(2);
    this.out.channelCountMode = 'explicit';
    this.out.channelCount = 1;

    // downmixing gains for left and right ears
    this.gainMid = this.ctx.createGain();
    this.gainSide = this.ctx.createGain();
    this.invertSide = this.ctx.createGain();
    this.gainMid.gain.value = 1;
    this.gainSide.gain.value = 1;
    this.invertSide.gain.value = -1;

    // convolver nodes
    for (let i = 0; i < this.nCh; i++) {
      this.decFilterNodes[i] = this.ctx.createConvolver();
      this.decFilterNodes[i].normalize = false;
    }

    // initialize convolvers to plain cardioids
    this.resetFilters();

    // create audio connections
    for (let i = 0; i < this.nCh; i++) {
      this.in.connect(this.decFilterNodes[i], i, 0);
      const n = Math.floor(Math.sqrt(i));
      const m = i - n * n - n;
      if (m >= 0) {
        this.decFilterNodes[i].connect(this.gainMid);
      } else {
        this.decFilterNodes[i].connect(this.gainSide);
      }
    }
    this.gainMid.connect(this.out, 0, 0);
    this.gainSide.connect(this.out, 0, 0);

    this.gainMid.connect(this.out, 0, 1);
    this.gainSide.connect(this.invertSide, 0, 0);
    this.invertSide.connect(this.out, 0, 1);

    this.initialized = true;
  }

  updateFilters(audioBuffer: AudioBuffer): void {
    // assign filters to convolvers
    for (let i = 0; i < this.nCh; i++) {
      this.decFilters[i] = this.ctx.createBuffer(
        1,
        audioBuffer.length,
        audioBuffer.sampleRate
      );
      this.decFilters[i].getChannelData(0).set(audioBuffer.getChannelData(i));
      this.decFilterNodes[i].buffer = this.decFilters[i];
    }
  }

  resetFilters(): void {
    // overwrite decoding filters (plain cardioid virtual microphones)
    const cardGains = new Array<number>(this.nCh);
    cardGains.fill(0);
    cardGains[0] = 0.5;
    cardGains[1] = 0.5 / Math.sqrt(3);

    for (let i = 0; i < this.nCh; i++) {
      // Safari forces us to use buffer length of 64
      // (will send noise bursts for any value below 64)
      this.decFilters[i] = this.ctx.createBuffer(1, 64, this.ctx.sampleRate);
      for (let j = 0; j < 64; j++) {
        this.decFilters[i].getChannelData(0)[j] = 0.0;
      }
      this.decFilters[i].getChannelData(0)[0] = cardGains[i];
      this.decFilterNodes[i].buffer = this.decFilters[i];
    }
  }
}
