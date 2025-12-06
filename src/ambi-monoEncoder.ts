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

/////////////////
/* HOA ENCODER */
/////////////////

import * as jshlib from 'spherical-harmonic-transform';
import {
  type InitializableProcessor,
  type OrientableProcessor,
  getAmbisonicChannelCount,
  degreesToRadians,
} from './types';

export default class monoEncoder implements InitializableProcessor, OrientableProcessor {
  readonly ctx: AudioContext;
  readonly order: number;
  readonly nCh: number;
  readonly in: GainNode;
  readonly out: ChannelMergerNode;

  initialized: boolean;
  azim: number;
  elev: number;

  private gains: number[];
  private gainNodes: GainNode[];

  constructor(audioCtx: AudioContext, order: number) {
    this.initialized = false;

    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.azim = 0;
    this.elev = 0;
    this.gains = new Array(this.nCh);
    this.gainNodes = new Array(this.nCh);
    this.in = this.ctx.createGain();
    this.in.channelCountMode = 'explicit';
    this.in.channelCount = 1;
    this.out = this.ctx.createChannelMerger(this.nCh);

    // Initialize encoding gains
    for (let i = 0; i < this.nCh; i++) {
      this.gainNodes[i] = this.ctx.createGain();
      this.gainNodes[i].channelCountMode = 'explicit';
      this.gainNodes[i].channelCount = 1;
    }
    this.updateGains();

    // Make audio connections
    for (let i = 0; i < this.nCh; i++) {
      this.in.connect(this.gainNodes[i]);
      this.gainNodes[i].connect(this.out, 0, i);
    }

    this.initialized = true;
  }

  updateGains(): void {
    const g_enc = jshlib.computeRealSH(this.order, [
      [degreesToRadians(this.azim), degreesToRadians(this.elev)],
    ]);

    for (let i = 0; i < this.nCh; i++) {
      this.gains[i] = g_enc[i][0];
      this.gainNodes[i].gain.value = this.gains[i];
    }
  }
}
