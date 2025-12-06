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

import { getAmbisonicChannelCount } from './types';

///////////////////////////////////
/* FOA B-FORMAT TO ACN/N3D CONVERTER */
///////////////////////////////////
export class wxyz2acn {
  readonly ctx: AudioContext;
  readonly in: ChannelSplitterNode;
  readonly out: ChannelMergerNode;

  private gains: GainNode[];

  constructor(audioCtx: AudioContext) {
    this.ctx = audioCtx;
    this.in = this.ctx.createChannelSplitter(4);
    this.out = this.ctx.createChannelMerger(4);
    this.gains = new Array(4);

    for (let i = 0; i < 4; i++) {
      this.gains[i] = this.ctx.createGain();
      if (i === 0) this.gains[i].gain.value = Math.SQRT2;
      else this.gains[i].gain.value = Math.sqrt(3);

      this.gains[i].connect(this.out, 0, i);
    }
    this.in.connect(this.gains[0], 0, 0);
    this.in.connect(this.gains[3], 1, 0);
    this.in.connect(this.gains[1], 2, 0);
    this.in.connect(this.gains[2], 3, 0);
  }
}

///////////////////////////////////
/* ACN/N3D TO FOA B-FORMAT CONVERTER */
///////////////////////////////////
export class acn2wxyz {
  readonly ctx: AudioContext;
  readonly in: ChannelSplitterNode;
  readonly out: ChannelMergerNode;

  private gains: GainNode[];

  constructor(audioCtx: AudioContext) {
    this.ctx = audioCtx;
    this.in = this.ctx.createChannelSplitter(4);
    this.out = this.ctx.createChannelMerger(4);
    this.gains = new Array(4);

    for (let i = 0; i < 4; i++) {
      this.gains[i] = this.ctx.createGain();
      if (i === 0) this.gains[i].gain.value = Math.SQRT1_2;
      else this.gains[i].gain.value = 1 / Math.sqrt(3);

      this.gains[i].connect(this.out, 0, i);
    }
    this.in.connect(this.gains[0], 0, 0);
    this.in.connect(this.gains[2], 1, 0);
    this.in.connect(this.gains[3], 2, 0);
    this.in.connect(this.gains[1], 3, 0);
  }
}

///////////////////////////////////
/* ACN/SN3D TO ACN/N3D CONVERTER */
///////////////////////////////////
export class sn3d2n3d {
  readonly ctx: AudioContext;
  readonly order: number;
  readonly nCh: number;
  readonly in: ChannelSplitterNode;
  readonly out: ChannelMergerNode;

  private gains: GainNode[];

  constructor(audioCtx: AudioContext, order: number) {
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(this.nCh);
    this.gains = new Array(this.nCh);

    for (let i = 0; i < this.nCh; i++) {
      const n = Math.floor(Math.sqrt(i));

      this.gains[i] = this.ctx.createGain();
      this.gains[i].gain.value = Math.sqrt(2 * n + 1);

      this.in.connect(this.gains[i], i, 0);
      this.gains[i].connect(this.out, 0, i);
    }
  }
}

///////////////////////////////////
/* ACN/N3D TO ACN/SN3D CONVERTER */
///////////////////////////////////
export class n3d2sn3d {
  readonly ctx: AudioContext;
  readonly order: number;
  readonly nCh: number;
  readonly in: ChannelSplitterNode;
  readonly out: ChannelMergerNode;

  private gains: GainNode[];

  constructor(audioCtx: AudioContext, order: number) {
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(this.nCh);
    this.gains = new Array(this.nCh);

    for (let i = 0; i < this.nCh; i++) {
      const n = Math.floor(Math.sqrt(i));

      this.gains[i] = this.ctx.createGain();
      this.gains[i].gain.value = 1 / Math.sqrt(2 * n + 1);

      this.in.connect(this.gains[i], i, 0);
      this.gains[i].connect(this.out, 0, i);
    }
  }
}

///////////////////////////////
/* FUMA TO ACN/N3D CONVERTER */
///////////////////////////////
export class fuma2acn {
  readonly ctx: AudioContext;
  readonly order: number;
  readonly nCh: number;
  readonly in: ChannelSplitterNode;
  readonly out: ChannelMergerNode;

  private gains: GainNode[];
  private remapArray: number[];

  constructor(audioCtx: AudioContext, order: number) {
    let actualOrder = order;
    if (actualOrder > 3) {
      console.log('FuMa specifiction is supported up to 3rd order');
      actualOrder = 3;
    }

    // gains for each FuMa channel to N3D, after re-mapping channels
    const gains_fuma2n3d = [
      Math.sqrt(2), // W
      Math.sqrt(3), // Y
      Math.sqrt(3), // Z
      Math.sqrt(3), // X
      Math.sqrt(15) / 2, // V
      Math.sqrt(15) / 2, // T
      Math.sqrt(5), // R
      Math.sqrt(15) / 2, // S
      Math.sqrt(15) / 2, // U
      Math.sqrt(35 / 8), // Q
      Math.sqrt(35) / 3, // O
      Math.sqrt(224 / 45), // M
      Math.sqrt(7), // K
      Math.sqrt(224 / 45), // L
      Math.sqrt(35) / 3, // N
      Math.sqrt(35 / 8), // P
    ];

    this.ctx = audioCtx;
    this.order = actualOrder;
    this.nCh = getAmbisonicChannelCount(actualOrder);
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(this.nCh);
    this.gains = [];
    this.remapArray = [];

    // get channel remapping values order 0-1
    this.remapArray.push(0, 2, 3, 1); // manually handle until order 1

    // get channel remapping values order 2-N
    if (actualOrder > 1) {
      let o = 0;
      let m: number[];
      for (let i = 0; i < this.nCh; i++) {
        m = [];
        if (i >= (o + 1) * (o + 1)) {
          o += 1;
          for (let j = (o + 1) * (o + 1); j < (o + 2) * (o + 2); j++) {
            if ((j + (o % 2)) % 2 === 0) {
              m.push(j);
            } else {
              m.unshift(j);
            }
          }
          this.remapArray = this.remapArray.concat(m);
        }
      }
    }

    // connect inputs/outputs (kept separated for clarity's sake)
    for (let i = 0; i < this.nCh; i++) {
      this.gains[i] = this.ctx.createGain();
      this.gains[i].gain.value = gains_fuma2n3d[i];
      this.in.connect(this.gains[i], this.remapArray[i], 0);
      this.gains[i].connect(this.out, 0, i);
    }
  }
}
