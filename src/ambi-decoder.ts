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

///////////////////////////
/* HOA AMBISONIC DECODER */
///////////////////////////

import * as utils from './utils.js';
import { type AmbisonicProcessor, getAmbisonicChannelCount } from './types';

/** Speaker position in spherical coordinates: [azimuth, elevation, distance] */
export type SpeakerPosition = [number, number, number];

export default class decoder implements AmbisonicProcessor {
  readonly ctx: AudioContext;
  readonly order: number;
  readonly nCh: number;
  readonly in: ChannelSplitterNode;

  out: ChannelMergerNode;
  nSpk: number;

  private _decodingMatrix: number[][];
  private _spkSphPosArray: SpeakerPosition[];
  private mtxGain: GainNode[][] | undefined;

  constructor(audioCtx: AudioContext, order: number) {
    // locals
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.nSpk = 0;
    this._decodingMatrix = [];
    this._spkSphPosArray = [];

    // Input and output nodes
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(1); // dummy

    // dummy init array
    this._spkSphPosArray = this._getDefaultSpkConfig(this.order);
    this._updateDecodeMtx(this._spkSphPosArray);
  }

  // spkSphPosArray in spherical coordinates: [ [azim1, elev1, dist1], ... [azimN, elevN, distN] ]
  set speakerPos(spkSphPosArray: SpeakerPosition[] | undefined) {
    // set default array
    if (spkSphPosArray === undefined) {
      spkSphPosArray = this._getDefaultSpkConfig(this.order);
    }
    this._spkSphPosArray = spkSphPosArray;
    // discard old output
    this.out.disconnect();
    // update output / decode matrix
    this._updateDecodeMtx(spkSphPosArray);
  }

  get speakerPos(): SpeakerPosition[] {
    return this._spkSphPosArray;
  }

  // internal method to calculate Ambisonic decoding matrix and define new ambisonic gain nodes and values
  private _updateDecodeMtx(spkSphPosArray: SpeakerPosition[]): void {
    // update output
    this.nSpk = spkSphPosArray.length;
    this.out = this.ctx.createChannelMerger(this.nSpk);

    // get decoding matrix
    this._decodingMatrix = utils.getAmbisonicDecMtx(spkSphPosArray, this.order);

    // assign ambisonic gains to gain matrix + connect new graph
    this.mtxGain = new Array(this.nCh);
    for (let i = 0; i < this.nCh; i++) {
      this.mtxGain[i] = new Array(this.nSpk);
      for (let j = 0; j < this.nSpk; j++) {
        // create / setup gain
        const g = this.ctx.createGain();
        g.gain.value = this._decodingMatrix[j][i];
        // connect graph
        this.in.connect(g, i, 0);
        g.connect(this.out, 0, j);
        // save to local
        this.mtxGain[i][j] = g;
      }
    }
  }

  // get default speaker configuration for orders 1, 2, 3
  private _getDefaultSpkConfig(order: number): SpeakerPosition[] {
    let spkSphPosArray: SpeakerPosition[] = [];
    switch (order) {
      case 1:
        // default first order: octahedron
        spkSphPosArray = [
          [0, 0, 1],
          [90, 0, 1],
          [180, 0, 1],
          [270, 0, 1],
          [0, 90, 1],
          [0, -90, 1],
        ];
        break;
      case 2:
        // default second order: icosahedron
        spkSphPosArray = [
          [180.0, -31.7161, 0.5878],
          [180.0, 31.7161, 0.5878],
          [-121.7161, 0, 0.5878],
          [121.7161, 0, 0.5878],
          [-90.0, -58.2839, 0.5878],
          [-90.0, 58.2839, 0.5878],
          [90.0, -58.2839, 0.5878],
          [90.0, 58.2839, 0.5878],
          [-58.2839, 0, 0.5878],
          [58.2839, 0, 0.5878],
          [0, -31.7161, 0.5878],
          [0, 31.7161, 0.5878],
        ];
        break;
      case 3:
        // default third order: dodecahedron
        spkSphPosArray = [
          [-159.0931, 0, 0.5352],
          [159.0931, 0, 0.5352],
          [-135.0, -35.2644, 0.5352],
          [-135.0, 35.2644, 0.5352],
          [135.0, -35.2644, 0.5352],
          [135.0, 35.2644, 0.5352],
          [180.0, -69.0931, 0.5352],
          [180.0, 69.0931, 0.5352],
          [-90.0, -20.9069, 0.5352],
          [-90.0, 20.9069, 0.5352],
          [90.0, -20.9069, 0.5352],
          [90.0, 20.9069, 0.5352],
          [0, -69.0931, 0.5352],
          [0, 69.0931, 0.5352],
          [-45.0, -35.2644, 0.5352],
          [-45.0, 35.2644, 0.5352],
          [45.0, -35.2644, 0.5352],
          [45.0, 35.2644, 0.5352],
          [-20.9069, 0, 0.5352],
          [20.9069, 0, 0.5352],
        ];
        break;
      default:
        console.error('unsupported default order:', order);
    }
    return spkSphPosArray;
  }
}
