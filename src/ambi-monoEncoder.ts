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
/* HOA ENCODER */
/////////////////

import * as jshlib from 'spherical-harmonic-transform';
import {
  type InitializableProcessor,
  type OrientableProcessor,
  type CoordinateSystem,
  getAmbisonicChannelCount,
  degreesToRadians,
  radiansToDegrees,
} from './types';

export default class monoEncoder implements InitializableProcessor, OrientableProcessor {
  readonly ctx: AudioContext;
  readonly order: number;
  readonly nCh: number;
  readonly in: GainNode;
  readonly out: ChannelMergerNode;

  initialized: boolean;
  azim: number;
  elev: number;

  private gains: number[];
  private gainNodes: GainNode[];

  constructor(audioCtx: AudioContext, order: number) {
    this.initialized = false;

    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.azim = 0;
    this.elev = 0;
    this.gains = new Array(this.nCh);
    this.gainNodes = new Array(this.nCh);
    this.in = this.ctx.createGain();
    this.in.channelCountMode = 'explicit';
    this.in.channelCount = 1;
    this.out = this.ctx.createChannelMerger(this.nCh);

    // Initialize encoding gains
    for (let i = 0; i < this.nCh; i++) {
      this.gainNodes[i] = this.ctx.createGain();
      this.gainNodes[i].channelCountMode = 'explicit';
      this.gainNodes[i].channelCount = 1;
    }
    this.updateGains();

    // Make audio connections
    for (let i = 0; i < this.nCh; i++) {
      this.in.connect(this.gainNodes[i]);
      this.gainNodes[i].connect(this.out, 0, i);
    }

    this.initialized = true;
  }

  updateGains(): void {
    const g_enc = jshlib.computeRealSH(this.order, [
      [degreesToRadians(this.azim), degreesToRadians(this.elev)],
    ]);

    for (let i = 0; i < this.nCh; i++) {
      this.gains[i] = g_enc[i][0];
      this.gainNodes[i].gain.value = this.gains[i];
    }
  }

  /**
   * Set the encoding direction from a Cartesian direction vector.
   * The vector does not need to be normalized.
   *
   * @param x - X component of direction vector
   * @param y - Y component of direction vector
   * @param z - Z component of direction vector
   * @param coords - Coordinate system convention (default: 'ambisonics')
   *   - 'ambisonics': +X forward, +Y left, +Z up
   *   - 'threejs': +Z forward, +Y up, +X right
   */
  setDirection(x: number, y: number, z: number, coords: CoordinateSystem = 'ambisonics'): void {
    let ax = x, ay = y, az = z;

    if (coords === 'threejs') {
      // Three.js: +Z forward, +Y up, +X right
      // Ambisonics: +X forward, +Y left, +Z up
      // Mapping: ambi_x = three_z, ambi_y = -three_x, ambi_z = three_y
      ax = z;
      ay = -x;
      az = y;
    }

    const [[azimRad, elevRad]] = jshlib.convertCart2Sph([[ax, ay, az]], 1) as [number, number][];
    this.azim = radiansToDegrees(azimRad);
    this.elev = radiansToDegrees(elevRad);
    this.updateGains();
  }

  /**
   * Get the current encoding direction as a Cartesian unit vector.
   *
   * @param coords - Coordinate system convention (default: 'ambisonics')
   * @returns Direction as [x, y, z] unit vector
   */
  getDirection(coords: CoordinateSystem = 'ambisonics'): [number, number, number] {
    const azimRad = degreesToRadians(this.azim);
    const elevRad = degreesToRadians(this.elev);

    // Spherical to Cartesian (ambisonics convention)
    const cosElev = Math.cos(elevRad);
    const ax = cosElev * Math.cos(azimRad);
    const ay = cosElev * Math.sin(azimRad);
    const az = Math.sin(elevRad);

    if (coords === 'threejs') {
      // Ambisonics → Three.js: three_x = -ambi_y, three_y = ambi_z, three_z = ambi_x
      return [-ay, az, ax];
    }

    return [ax, ay, az];
  }
}
