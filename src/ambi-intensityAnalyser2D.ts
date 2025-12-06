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
////////////////////////////////////////////////////////////////////
//
//  intensityAnalyser for 2D use
//  adapted by Thomas Deppisch
//  thomas.deppisch93@gmail.com
//
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/* PRESSURE-VELOCITY INTENSITY ANALYZER for 2D Ambisonics */
////////////////////////////////////////////////////////////

// for Safari support where audioContext.Analyser.getFloatTimeDomainData is not defined for now
import 'get-float-time-domain-data';
import { radiansToDegrees } from './types';

/** Intensity analysis result: [azimuth, elevation, diffuseness, energy] */
export type IntensityParams2D = [number, number, number, number];

export default class intensityAnalyser2D {
  readonly ctx: AudioContext;
  readonly fftSize: number;
  readonly in: ChannelSplitterNode;
  readonly out: ChannelMergerNode;

  private gains: GainNode[];
  private analysers: AnalyserNode[];
  private analBuffers: Float32Array<ArrayBuffer>[];

  constructor(audioCtx: AudioContext) {
    this.ctx = audioCtx;
    this.fftSize = 2048;

    // Input and output nodes
    this.in = this.ctx.createChannelSplitter(3);
    this.out = this.ctx.createChannelMerger(3);

    // Gains to go from ACN/N3D to pressure-velocity (WXY)
    this.gains = new Array(2);
    for (let i = 0; i < 2; i++) {
      this.gains[i] = this.ctx.createGain();
      this.gains[i].gain.value = 1 / Math.sqrt(3);
    }

    // Initialize analyzer buffers
    this.analysers = new Array(3);
    this.analBuffers = new Array(3);
    for (let i = 0; i < 3; i++) {
      this.analysers[i] = this.ctx.createAnalyser();
      this.analysers[i].fftSize = this.fftSize;
      this.analysers[i].smoothingTimeConstant = 0;
      this.analBuffers[i] = new Float32Array(this.fftSize);
    }

    // Create connections
    this.in.connect(this.out, 0, 0); // W
    this.in.connect(this.analysers[0], 0, 0);

    this.in.connect(this.gains[1], 1, 0); // X
    this.in.connect(this.gains[0], 2, 0); // Y
    for (let i = 0; i < 2; i++) {
      this.gains[i].connect(this.analysers[i + 1], 0, 0);
      this.gains[i].connect(this.out, 0, i + 1);
    }
  }

  updateBuffers(): void {
    // Get latest time-domain data
    for (let i = 0; i < 3; i++) {
      this.analysers[i].getFloatTimeDomainData(this.analBuffers[i]);
    }
  }

  computeIntensity(): IntensityParams2D {
    // Compute correlations and energies of channels
    let iX = 0;
    let iY = 0;
    let WW = 0;
    let XX = 0;
    let YY = 0;

    // Accumulators for correlations and energies
    for (let i = 0; i < this.fftSize; i++) {
      iX = iX + this.analBuffers[0][i] * this.analBuffers[1][i];
      iY = iY + this.analBuffers[0][i] * this.analBuffers[2][i];
      WW = WW + this.analBuffers[0][i] * this.analBuffers[0][i];
      XX = XX + this.analBuffers[1][i] * this.analBuffers[1][i];
      YY = YY + this.analBuffers[2][i] * this.analBuffers[2][i];
    }

    const I = [iX, iY]; // intensity
    const I_norm = Math.sqrt(I[0] * I[0] + I[1] * I[1]); // intensity magnitude
    const E = (WW + XX + YY) / 2; // energy
    const Psi = 1 - I_norm / (E + 10e-8); // diffuseness
    const azim = -radiansToDegrees(Math.atan2(iY, iX));
    const elev = 0;

    return [azim, elev, Psi, E];
  }
}
