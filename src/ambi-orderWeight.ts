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

/////////////////////////
/* HOA ORDER WEIGHTING */
/////////////////////////

import * as jshlib from 'spherical-harmonic-transform';
import { type AmbisonicProcessor, getAmbisonicChannelCount } from './types';

export default class orderWeight implements AmbisonicProcessor {
  readonly ctx: AudioContext;
  readonly order: number;
  readonly nCh: number;
  readonly in: ChannelSplitterNode;
  readonly out: ChannelMergerNode;

  orderGains: number[];
  private gains: GainNode[];

  constructor(audioCtx: AudioContext, order: number) {
    this.ctx = audioCtx;
    this.order = order;

    this.nCh = getAmbisonicChannelCount(this.order);
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(this.nCh);

    this.gains = new Array(this.nCh);
    this.orderGains = new Array(this.order + 1);
    this.orderGains.fill(1);

    // initialize gains and connections
    for (let i = 0; i < this.nCh; i++) {
      this.gains[i] = this.ctx.createGain();

      this.in.connect(this.gains[i], i, 0);
      this.gains[i].connect(this.out, 0, i);
    }
  }

  updateOrderGains(): void {
    for (let i = 0; i < this.nCh; i++) {
      const n = Math.floor(Math.sqrt(i));
      this.gains[i].gain.value = this.orderGains[n];
    }
  }

  computeMaxRECoeffs(): void {
    const N = this.order;
    this.orderGains[0] = 1;
    let leg_n_minus1: number | number[][] = 0;
    let leg_n_minus2: number | number[][] = 0;

    for (let n = 1; n <= N; n++) {
      const leg_n = jshlib.recurseLegendrePoly(
        n,
        [Math.cos(2.406809 / (N + 1.51))],
        leg_n_minus1,
        leg_n_minus2
      );
      this.orderGains[n] = leg_n[0][0];

      leg_n_minus2 = leg_n_minus1;
      leg_n_minus1 = leg_n;
    }
  }
}
