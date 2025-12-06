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
//
//  monoEncoder for 2D use
//  adapted by Thomas Deppisch
//  thomas.deppisch93@gmail.com
//
////////////////////////////////////////////////////////////////////
////////////////////
/* HOA 2D ENCODER */
///////////////////

import * as utils from './utils.js';
import {
  type InitializableProcessor,
  type OrientableProcessor,
  getAmbisonicChannelCount2D,
} from './types';

export default class monoEncoder2D implements InitializableProcessor, OrientableProcessor {
  readonly ctx: AudioContext;
  readonly order: number;
  readonly nCh: number;
  readonly in: GainNode;
  readonly out: ChannelMergerNode;

  initialized: boolean;
  azim: number;
  elev: number;

  private gainNodes: GainNode[];

  constructor(audioCtx: AudioContext, order: number) {
    this.initialized = false;

    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount2D(order);
    this.azim = 0;
    this.elev = 0;
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
    const g_enc = utils.getCircHarmonics(this.order, [this.azim]);

    for (let i = 0; i < this.nCh; i++) {
      this.gainNodes[i].gain.value = g_enc[i][0];
    }
  }
}
