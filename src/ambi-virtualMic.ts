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

/////////////////////////////////
/* HOA VIRTUAL MICROPHONE */
/////////////////////////////////

import * as jshlib from 'spherical-harmonic-transform';
import {
  type InitializableProcessor,
  type OrientableProcessor,
  type VmicPattern,
  getAmbisonicChannelCount,
  degreesToRadians,
} from './types';

export default class virtualMic
  implements InitializableProcessor, OrientableProcessor
{
  readonly ctx: AudioContext;
  readonly order: number;
  readonly nCh: number;
  readonly in: ChannelSplitterNode;
  readonly out: GainNode;

  initialized: boolean;
  azim: number;
  elev: number;
  vmicPattern: VmicPattern;

  private vmicGains: number[];
  private vmicGainNodes: GainNode[];
  private vmicCoeffs: number[];
  private SHxyz: number[];

  constructor(audioCtx: AudioContext, order: number) {
    this.initialized = false;

    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.azim = 0;
    this.elev = 0;
    this.vmicGains = new Array(this.nCh);
    this.vmicGainNodes = new Array(this.nCh);
    this.vmicCoeffs = new Array(this.order + 1);
    this.vmicPattern = 'hypercardioid';
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createGain();

    // Initialize vmic to forward facing hypercardioid
    for (let i = 0; i < this.nCh; i++) {
      this.vmicGainNodes[i] = this.ctx.createGain();
    }
    this.SHxyz = new Array(this.nCh);
    this.SHxyz.fill(0);
    this.updatePattern();
    this.updateOrientation();

    // Create connections
    for (let i = 0; i < this.nCh; i++) {
      this.in.connect(this.vmicGainNodes[i], i, 0);
      this.vmicGainNodes[i].connect(this.out);
    }

    this.initialized = true;
  }

  updatePattern(): void {
    switch (this.vmicPattern) {
      case 'cardioid':
        // higher-order cardioid given by: (1/2)^N * ( 1+cos(theta) )^N
        this.vmicCoeffs = this.computeCardioidCoeffs(this.order);
        break;
      case 'supercardioid':
        // maximum front-back energy ratio
        this.vmicCoeffs = this.computeSupercardCoeffs(this.order);
        break;
      case 'hypercardioid':
        // maximum directivity factor
        // (this is the classic plane/wave decomposition beamformer,
        // also termed "regular" in spherical beamforming literature)
        this.vmicCoeffs = this.computeHypercardCoeffs(this.order);
        break;
      case 'max_rE':
        // quite similar to maximum front-back rejection
        this.vmicCoeffs = this.computeMaxRECoeffs(this.order);
        break;
      default:
        this.vmicPattern = 'hypercardioid';
        this.vmicCoeffs = this.computeHypercardCoeffs(this.order);
    }

    this.updateGains();
  }

  updateOrientation(): void {
    const azim = degreesToRadians(this.azim);
    const elev = degreesToRadians(this.elev);

    const tempSH = jshlib.computeRealSH(this.order, [[azim, elev]]);

    for (let i = 0; i < this.nCh; i++) {
      this.SHxyz[i] = tempSH[i][0];
    }

    this.updateGains();
  }

  private updateGains(): void {
    for (let n = 0; n <= this.order; n++) {
      for (let m = -n; m <= n; m++) {
        const q = n * n + n + m;
        this.vmicGains[q] = this.vmicCoeffs[n] * this.SHxyz[q];
      }
    }

    for (let i = 0; i < this.nCh; i++) {
      this.vmicGainNodes[i].gain.value = this.vmicGains[i];
    }
  }

  private computeCardioidCoeffs(N: number): number[] {
    const coeffs = new Array<number>(N + 1);
    for (let n = 0; n <= N; n++) {
      coeffs[n] =
        (jshlib.factorial(N) * jshlib.factorial(N)) /
        (jshlib.factorial(N + n + 1) * jshlib.factorial(N - n));
    }
    return coeffs;
  }

  private computeHypercardCoeffs(N: number): number[] {
    const coeffs = new Array<number>(N + 1);
    const nSH = (N + 1) * (N + 1);
    for (let n = 0; n <= N; n++) {
      coeffs[n] = 1 / nSH;
    }
    return coeffs;
  }

  private computeSupercardCoeffs(N: number): number[] {
    switch (N) {
      case 1:
        return [0.366, 0.2113];
      case 2:
        return [0.2362, 0.1562, 0.059];
      case 3:
        return [0.1768, 0.1281, 0.0633, 0.0175];
      case 4:
        return [0.1414, 0.1087, 0.0623, 0.0247, 0.0054];
      default:
        console.error('Orders should be in the range of 1-4 at the moment.');
        return [];
    }
  }

  private computeMaxRECoeffs(N: number): number[] {
    const coeffs = new Array<number>(N + 1);
    coeffs[0] = 1;
    let leg_n_minus1: number | number[][] = 0;
    let leg_n_minus2: number | number[][] = 0;

    for (let n = 1; n < N + 1; n++) {
      const leg_n = jshlib.recurseLegendrePoly(
        n,
        [Math.cos(2.406809 / (N + 1.51))],
        leg_n_minus1,
        leg_n_minus2
      );
      coeffs[n] = leg_n[0][0];

      leg_n_minus2 = leg_n_minus1;
      leg_n_minus1 = leg_n;
    }

    // compute normalization factor
    let norm = 0;
    for (let n = 0; n <= N; n++) {
      norm += coeffs[n] * (2 * n + 1);
    }
    for (let n = 0; n <= N; n++) {
      coeffs[n] = coeffs[n] / norm;
    }
    return coeffs;
  }
}
