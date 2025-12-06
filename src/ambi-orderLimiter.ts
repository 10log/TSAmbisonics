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

///////////////////////
/* HOA ORDER LIMITER */
///////////////////////

import { type AmbisonicProcessor, getAmbisonicChannelCount } from './types';

export default class orderLimiter implements AmbisonicProcessor {
  readonly ctx: AudioContext;
  readonly orderIn: number;
  readonly nChIn: number;
  readonly in: ChannelSplitterNode;

  orderOut: number;
  nChOut: number;
  out: ChannelMergerNode;

  // Implement AmbisonicProcessor interface
  get order(): number {
    return this.orderOut;
  }
  get nCh(): number {
    return this.nChOut;
  }

  constructor(audioCtx: AudioContext, orderIn: number, orderOut: number) {
    this.ctx = audioCtx;
    this.orderIn = orderIn;
    this.orderOut = orderOut < orderIn ? orderOut : orderIn;

    this.nChIn = getAmbisonicChannelCount(this.orderIn);
    this.nChOut = getAmbisonicChannelCount(this.orderOut);
    this.in = this.ctx.createChannelSplitter(this.nChIn);
    this.out = this.ctx.createChannelMerger(this.nChOut);

    for (let i = 0; i < this.nChOut; i++) {
      this.in.connect(this.out, i, i);
    }
  }

  updateOrder(orderOut: number): void {
    if (orderOut > this.orderIn) {
      return;
    }

    this.orderOut = orderOut;
    this.nChOut = getAmbisonicChannelCount(this.orderOut);
    this.out.disconnect();
    this.out = this.ctx.createChannelMerger(this.nChOut);

    for (let i = 0; i < this.nChOut; i++) {
      this.in.connect(this.out, i, i);
    }
  }
}
