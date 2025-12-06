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

import * as serveSofaHrir from 'serve-sofa-hrir';
import * as utils from './utils.js';
import { type LoaderCallback, getAmbisonicChannelCount } from './types';

export default class HRIRloader_ircam {
  readonly context: AudioContext;
  readonly order: number;
  readonly nCh: number;
  readonly onLoad: LoaderCallback;
  readonly hrtfSet: serveSofaHrir.HrtfSet;
  readonly wishedSpeakerPos: [number, number, number][];

  private hrirBuffer: AudioBuffer[];
  private decodingMatrix: number[][];
  private hoaBuffer: AudioBuffer | null;

  constructor(context: AudioContext, order: number, callback: LoaderCallback) {
    this.context = context;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);

    // fonction called when filters loaded
    this.onLoad = callback;

    // instantiate hrtfset from serve-sofa-hrtf lib
    this.hrtfSet = new serveSofaHrir.HrtfSet({
      audioContext: this.context,
      coordinateSystem: 'sofaSpherical',
    });

    // define required speakers (hence hrirs) positions based on Ambisonic order
    this.wishedSpeakerPos = utils.getTdesign(2 * this.order) as [number, number, number][];

    // Initialize properties
    this.hrirBuffer = [];
    this.decodingMatrix = [];
    this.hoaBuffer = null;
  }

  load(setUrl: string): void {
    this.hrtfSet.load(setUrl).then(() => {
      // extract hrir buffers of interest from the database
      const grantedFilterPos: [number, number, number][] = [];
      this.hrirBuffer = [];
      for (let i = 0; i < this.wishedSpeakerPos.length; i++) {
        // get available positions (in the db) nearest from the required speakers positions
        grantedFilterPos.push(this.hrtfSet.nearest(this.wishedSpeakerPos[i]).position);
        // get related hrir
        this.hrirBuffer.push(this.hrtfSet.nearest(this.wishedSpeakerPos[i]).fir);
      }

      // DEBUG //////////////////////////////////////////////////////
      // compare required vs. present positions in HRIR filter
      let angularDistDeg = 0;
      for (let i = 0; i < this.wishedSpeakerPos.length; i++) {
        if (this.wishedSpeakerPos[i][0] < 0) this.wishedSpeakerPos[i][0] += 360.0;
        angularDistDeg += Math.sqrt(
          Math.pow(this.wishedSpeakerPos[i][0] - grantedFilterPos[i][0], 2) +
            Math.pow(this.wishedSpeakerPos[i][1] - grantedFilterPos[i][1], 2)
        );
      }
      console.log(
        'summed / average angular dist between asked and present pos:',
        Math.round(angularDistDeg * 100) / 100,
        'deg /',
        Math.round((angularDistDeg / this.wishedSpeakerPos.length) * 100) / 100,
        'deg'
      );
      // DEBUG END //////////////////////////////////////////////////

      // get decoding matrix
      this.decodingMatrix = utils.getAmbisonicDecMtx(grantedFilterPos, this.order);

      // convert hrir filters to hoa filters
      this.hoaBuffer = this.getHoaFilterFromHrirFilter();

      // pass resulting hoa filters to user callback
      this.onLoad(this.hoaBuffer);
    });
  }

  getHoaFilterFromHrirFilter(): AudioBuffer {
    // create empty buffer ready to receive hoa filters
    const hrirBufferLength = this.hrirBuffer[0].length; // assuming they all have the same
    const hrirBufferSampleRate = this.hrirBuffer[0].sampleRate; // same
    const hoaBuffer = this.context.createBuffer(
      this.nCh,
      hrirBufferLength,
      hrirBufferSampleRate
    );

    // sum weighted HRIR over Ambisonic channels to create HOA IRs
    for (let i = 0; i < this.nCh; i++) {
      const concatBufferArrayLeft = new Float32Array(hrirBufferLength);
      for (let j = 0; j < this.hrirBuffer.length; j++) {
        for (let k = 0; k < hrirBufferLength; k++) {
          concatBufferArrayLeft[k] +=
            this.decodingMatrix[j][i] * this.hrirBuffer[j].getChannelData(0)[k];
        }
      }
      hoaBuffer.getChannelData(i).set(concatBufferArrayLeft);
    }

    return hoaBuffer;
  }
}
