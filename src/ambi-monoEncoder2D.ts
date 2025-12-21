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
//
//  monoEncoder for 2D use
//  adapted by Thomas Deppisch
//  thomas.deppisch93@gmail.com
//
////////////////////////////////////////////////////////////////////
////////////////////
/* HOA 2D ENCODER */
///////////////////

import * as utils from './utils.js';
import {
  type InitializableProcessor,
  type OrientableProcessor,
  type CoordinateSystem,
  getAmbisonicChannelCount2D,
  degreesToRadians,
  radiansToDegrees,
} from './types';

export default class monoEncoder2D implements InitializableProcessor, OrientableProcessor {
  readonly ctx: AudioContext;
  readonly order: number;
  readonly nCh: number;
  readonly in: GainNode;
  readonly out: ChannelMergerNode;

  initialized: boolean;
  azim: number;
  elev: number;

  private gainNodes: GainNode[];

  constructor(audioCtx: AudioContext, order: number) {
    this.initialized = false;

    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount2D(order);
    this.azim = 0;
    this.elev = 0;
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
    const g_enc = utils.getCircHarmonics(this.order, [this.azim]);

    for (let i = 0; i < this.nCh; i++) {
      this.gainNodes[i].gain.value = g_enc[i][0];
    }
  }

  /**
   * Set the encoding direction from a Cartesian direction vector.
   * Only the horizontal plane (x, y) components are used; z is ignored.
   * The vector does not need to be normalized.
   *
   * Note: A zero-length vector (0, 0, 0) or a purely vertical vector (0, 0, z)
   * results in azimuth 0° (front direction).
   *
   * @param x - X component of direction vector
   * @param y - Y component of direction vector
   * @param z - Z component (ignored for 2D encoding)
   * @param coords - Coordinate system convention (default: 'ambisonics')
   *   - 'ambisonics': +X forward, +Y left, +Z up
   *   - 'threejs': +Z forward, +Y up, +X right
   */
  setDirection(x: number, y: number, z: number, coords: CoordinateSystem = 'ambisonics'): void {
    let ax = x, ay = y;

    if (coords === 'threejs') {
      // Three.js: +Z forward, +X right
      // Ambisonics: +X forward, +Y left
      // For 2D: ambi_x = three_z, ambi_y = -three_x
      ax = z;
      ay = -x;
    }

    // Compute azimuth from x, y (z ignored for 2D)
    this.azim = radiansToDegrees(Math.atan2(ay, ax));
    this.elev = 0; // Always 0 for 2D encoder
    this.updateGains();
  }

  /**
   * Get the current encoding direction as a Cartesian unit vector.
   * The z component will always be 0 for 2D encoding.
   *
   * @param coords - Coordinate system convention (default: 'ambisonics')
   * @returns Direction as [x, y, z] unit vector (z always 0)
   */
  getDirection(coords: CoordinateSystem = 'ambisonics'): [number, number, number] {
    const azimRad = degreesToRadians(this.azim);

    // 2D: elevation is always 0, so z = 0
    const ax = Math.cos(azimRad);
    const ay = Math.sin(azimRad);

    if (coords === 'threejs') {
      // Ambisonics → Three.js: three_x = -ambi_y, three_y = 0, three_z = ambi_x
      return [-ay, 0, ax];
    }

    return [ax, ay, 0];
  }
}
