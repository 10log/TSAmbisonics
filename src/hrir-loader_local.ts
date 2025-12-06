////////////////////////////////////////////////////////////////////
//  Archontis Politis (Aalto University)
//  archontis.politis@aalto.fi
//  David Poirier-Quinot (IRCAM)
//  davipoir@ircam.fr
////////////////////////////////////////////////////////////////////
//
//  JSAmbisonics a JavaScript library for higher-order Ambisonics
//  The library implements Web Audio blocks that perform
//  typical ambisonic processing operations on audio signals.
//
////////////////////////////////////////////////////////////////////

/////////////////
/* HRIR LOADER */
/////////////////

import * as utils from './utils.js';
import { type LoaderCallback, getAmbisonicChannelCount } from './types';

/** SOFA JSON structure for HRIR data */
interface SofaHrirSet {
  leaves: Array<{
    data: number[] | number[][] | [number, number][] | [number[], number[]][];
  }>;
}

/** HRIR pair [left, right] */
type HrirPair = [Float64Array, Float64Array];

export default class HRIRloader_local {
  readonly context: AudioContext;
  readonly order: number;
  readonly nCh: number;
  readonly onLoad: LoaderCallback;
  readonly vls_dirs_deg: [number, number, number][];
  readonly nVLS: number;
  readonly nearestLookupRes: [number, number];

  private fs: number;
  private nSamples: number;
  private hrir_dirs_deg: [number, number][];
  private hrirs: HrirPair[];
  private nearestLookup: number[];
  private nearest_dirs_deg: [number, number][];
  private vls_hrirs: HrirPair[];
  private decodingMatrix: number[][];
  private hoaBuffer: AudioBuffer | null;

  constructor(context: AudioContext, order: number, callback: LoaderCallback) {
    this.context = context;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    // function called when filters loaded
    this.onLoad = callback;
    // define required virtual speaker positions based on Ambisonic order
    this.vls_dirs_deg = utils.getTdesign(2 * this.order) as [number, number, number][];
    this.nVLS = this.vls_dirs_deg.length;
    // angular resolution for fast lookup to closest HRIR to a given direction
    this.nearestLookupRes = [5, 5];

    // Initialize properties
    this.fs = 0;
    this.nSamples = 0;
    this.hrir_dirs_deg = [];
    this.hrirs = [];
    this.nearestLookup = [];
    this.nearest_dirs_deg = [];
    this.vls_hrirs = [];
    this.decodingMatrix = [];
    this.hoaBuffer = null;
  }

  load(setUrl: string): void {
    const self = this;
    // setup the request
    const requestHrir = new XMLHttpRequest();
    requestHrir.open('GET', setUrl, true);
    requestHrir.responseType = 'json';
    requestHrir.onload = function () {
      // load useful HRIR stuff from JSON
      self.parseHrirFromJSON(requestHrir.response);
      // construct lookup table for fast closest HRIR finding
      self.nearestLookup = utils.createNearestLookup(
        self.hrir_dirs_deg,
        self.nearestLookupRes
      );
      // find closest indices to VLS
      const nearestIdx = utils.findNearest(
        self.vls_dirs_deg,
        self.nearestLookup,
        self.nearestLookupRes
      );
      // get closest HRIRs to the VLS design
      self.nearest_dirs_deg = self.getClosestDirs(nearestIdx, self.hrir_dirs_deg);
      self.vls_hrirs = self.getClosestHrirFilters(nearestIdx, self.hrirs);
      // compute ambisonic decoding filters
      self.computeDecFilters();
    };
    requestHrir.send(); // Send the Request and Load the File
  }

  parseHrirFromJSON(hrirSet: SofaHrirSet): void {
    const self = this;
    this.fs = (hrirSet.leaves[6].data as number[])[0]; // samplerate of the set
    this.nSamples = (hrirSet.leaves[8].data as [number[], number[]][])[0][1].length; // length of HRIRs
    // parse azimuth-elevation of HRIRs
    this.hrir_dirs_deg = [];
    (hrirSet.leaves[4].data as [number, number][]).forEach(function (element) {
      self.hrir_dirs_deg.push([element[0], element[1]]);
    });
    // parse HRIR buffers
    this.hrirs = [];
    (hrirSet.leaves[8].data as [number[], number[]][]).forEach(function (element) {
      const left = new Float64Array(element[0]);
      const right = new Float64Array(element[1]);
      self.hrirs.push([left, right]);
    });
  }

  getClosestDirs(
    nearestIdx: number[],
    hrir_dirs_deg: [number, number][]
  ): [number, number][] {
    const nDirs = nearestIdx.length;
    const nearest_dirs_deg: [number, number][] = [];
    for (let i = 0; i < nDirs; i++) {
      // get available positions (in the HRIR set) nearest from the required speakers positions
      nearest_dirs_deg.push(hrir_dirs_deg[nearestIdx[i]]);
    }
    return nearest_dirs_deg;
  }

  getClosestHrirFilters(nearestIdx: number[], hrirs: HrirPair[]): HrirPair[] {
    const nDirs = nearestIdx.length;
    const nearest_hrirs: HrirPair[] = [];
    for (let i = 0; i < nDirs; i++) {
      // get respective hrirs
      nearest_hrirs.push(hrirs[nearestIdx[i]]);
    }
    return nearest_hrirs;
  }

  computeDecFilters(): void {
    // get decoding matrix
    this.decodingMatrix = utils.getAmbisonicDecMtx(
      this.nearest_dirs_deg,
      this.order
    );
    // convert hrir filters to hoa filters
    this.hoaBuffer = this.getHoaFilterFromHrirFilter(
      this.nCh,
      this.nSamples,
      this.fs,
      this.vls_hrirs,
      this.decodingMatrix
    );
    // pass resulting hoa filters to user callback
    this.onLoad(this.hoaBuffer);
  }

  getHoaFilterFromHrirFilter(
    nCh: number,
    nSamples: number,
    sampleRate: number,
    hrirs: HrirPair[],
    decodingMatrix: number[][]
  ): AudioBuffer {
    // create empty buffer ready to receive hoa filters
    if (nSamples > hrirs[0][0].length) nSamples = hrirs[0][0].length;
    const hoaBuffer = this.context.createBuffer(nCh, nSamples, sampleRate);

    // sum weighted HRIR over Ambisonic channels to create HOA IRs
    for (let i = 0; i < nCh; i++) {
      const concatBufferArrayLeft = new Float32Array(nSamples);
      for (let j = 0; j < hrirs.length; j++) {
        for (let k = 0; k < nSamples; k++) {
          concatBufferArrayLeft[k] += decodingMatrix[j][i] * hrirs[j][0][k];
        }
      }
      hoaBuffer.getChannelData(i).set(concatBufferArrayLeft);
    }
    return hoaBuffer;
  }
}
