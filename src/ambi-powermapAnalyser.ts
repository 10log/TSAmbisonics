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
/* HOA POWERMAP ANALYZER */
/////////////////////////////////

////// NOT COMPLETED YET !!! ///////

// for Safari support where audioContext.Analyser.getFloatTimeDomainData is not defined for now
import 'get-float-time-domain-data';

import numeric from 'numeric';
import * as jshlib from 'spherical-harmonic-transform';
import * as utils from './utils.js';
import { type AmbisonicProcessor, getAmbisonicChannelCount } from './types';

/** Power value at direction: [azimuth_rad, elevation_rad, power] */
export type PowerValue = [number, number, number];

/** Powermap mode: 0 = directional power values, 1 = SH coefficients */
export type PowermapMode = 0 | 1;

export default class powermapAnalyser implements AmbisonicProcessor {
  readonly ctx: AudioContext;
  readonly order: number;
  readonly nCh: number;
  readonly fftSize: number;
  readonly in: ChannelSplitterNode;
  readonly out: ChannelMergerNode;

  mode: PowermapMode;

  private analysers: AnalyserNode[];
  private analBuffers: Float32Array<ArrayBuffer>[];
  private td_dirs_rad: [number, number][];
  private SHmtx: number[][];

  constructor(audioCtx: AudioContext, order: number, mode: PowermapMode) {
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.fftSize = 2048;
    this.analysers = new Array(this.nCh);
    this.analBuffers = new Array(this.nCh);

    // Input and output nodes
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(this.nCh);

    // Initialize analyzer buffers
    for (let i = 0; i < this.nCh; i++) {
      this.analysers[i] = this.ctx.createAnalyser();
      this.analysers[i].fftSize = this.fftSize;
      this.analysers[i].smoothingTimeConstant = 0;
      this.analBuffers[i] = new Float32Array(this.fftSize);
    }

    // Create connections
    for (let i = 0; i < this.nCh; i++) {
      this.in.connect(this.out, i, i);
      this.in.connect(this.analysers[i], i, 0);
    }

    // Initialise t-Design for power map
    const td_dirs_deg = utils.getTdesign(4 * order);
    this.td_dirs_rad = utils.deg2rad(td_dirs_deg) as [number, number][];
    // SH sampling matrix
    this.SHmtx = jshlib.computeRealSH(this.order, this.td_dirs_rad);
    this.mode = mode;
  }

  updateBuffers(): void {
    // Get latest time-domain data
    for (let i = 0; i < this.nCh; i++) {
      this.analysers[i].getFloatTimeDomainData(this.analBuffers[i]);
    }
  }

  computePowermap(): PowerValue[] | number[] {
    const nDirs = this.td_dirs_rad.length;
    // reconstruction
    const data = numeric.dot(
      numeric.transpose(this.SHmtx),
      this.analBuffers as unknown as number[][]
    ) as number[][];

    // compute directional power
    const powerValues: PowerValue[] = new Array(nDirs);

    // Accumulators for energies
    for (let i = 0; i < nDirs; i++) {
      let tmp_pwr = 0;
      for (let n = 0; n < this.fftSize; n++) {
        tmp_pwr = tmp_pwr + data[i][n] * data[i][n];
      }
      tmp_pwr = tmp_pwr / this.fftSize;
      powerValues[i] = [
        this.td_dirs_rad[i][0],
        this.td_dirs_rad[i][1],
        tmp_pwr,
      ];
    }

    if (this.mode === 0) {
      return powerValues;
    } else {
      // Re-encode directional energy to SH coefficients
      const powerCoeffs = jshlib.forwardSHT(
        2 * this.order,
        powerValues,
        1,
        0
      );
      return powerCoeffs;
    }
  }
}
