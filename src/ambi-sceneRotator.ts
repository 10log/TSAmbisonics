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
/* HOA ROTATOR */
/////////////////

import * as jshlib from 'spherical-harmonic-transform';
import numeric from 'numeric';
import {
  type AmbisonicProcessor,
  type RotatableProcessor,
  getAmbisonicChannelCount,
  degreesToRadians,
} from './types';

export default class sceneRotator implements AmbisonicProcessor, RotatableProcessor {
  readonly ctx: AudioContext;
  readonly order: number;
  readonly nCh: number;
  readonly in: ChannelSplitterNode;
  readonly out: ChannelMergerNode;

  yaw: number;
  pitch: number;
  roll: number;

  private rotMtx: number[][];
  private rotMtxNodes: GainNode[][][];

  constructor(audioCtx: AudioContext, order: number) {
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.yaw = 0;
    this.pitch = 0;
    this.roll = 0;
    this.rotMtx = numeric.identity(this.nCh);
    this.rotMtxNodes = new Array(this.order);

    // Input and output nodes
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(this.nCh);

    // Initialize rotation gains to identity matrix
    for (let n = 1; n <= this.order; n++) {
      const gains_n: GainNode[][] = new Array(2 * n + 1);
      for (let i = 0; i < 2 * n + 1; i++) {
        gains_n[i] = new Array(2 * n + 1);
        for (let j = 0; j < 2 * n + 1; j++) {
          gains_n[i][j] = this.ctx.createGain();
          gains_n[i][j].gain.value = i === j ? 1 : 0;
        }
      }
      this.rotMtxNodes[n - 1] = gains_n;
    }

    // Create connections
    this.in.connect(this.out, 0, 0); // zeroth order ch. does not rotate

    let band_idx = 1;
    for (let n = 1; n <= this.order; n++) {
      for (let i = 0; i < 2 * n + 1; i++) {
        for (let j = 0; j < 2 * n + 1; j++) {
          this.in.connect(this.rotMtxNodes[n - 1][i][j], band_idx + j, 0);
          this.rotMtxNodes[n - 1][i][j].connect(this.out, 0, band_idx + i);
        }
      }
      band_idx = band_idx + 2 * n + 1;
    }
  }

  updateRotMtx(): void {
    const yaw = degreesToRadians(this.yaw);
    const pitch = degreesToRadians(this.pitch);
    const roll = degreesToRadians(this.roll);

    this.rotMtx = jshlib.getSHrotMtx(
      jshlib.yawPitchRoll2Rzyx(yaw, pitch, roll),
      this.order
    );

    let band_idx = 1;
    for (let n = 1; n < this.order + 1; n++) {
      for (let i = 0; i < 2 * n + 1; i++) {
        for (let j = 0; j < 2 * n + 1; j++) {
          this.rotMtxNodes[n - 1][i][j].gain.value =
            this.rotMtx[band_idx + i][band_idx + j];
        }
      }
      band_idx = band_idx + 2 * n + 1;
    }
  }
}
