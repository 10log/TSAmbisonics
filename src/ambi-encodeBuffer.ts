////////////////////////////////////////////////////////////////////
//  TSAmbisonics - Buffer-based ambisonic encoding utilities
//
//  These utilities encode audio buffers to ambisonics without
//  requiring an AudioContext, suitable for offline processing.
////////////////////////////////////////////////////////////////////

import * as jshlib from 'spherical-harmonic-transform';
import * as utils from './utils.js';
import {
  type CoordinateSystem,
  getAmbisonicChannelCount,
  getAmbisonicChannelCount2D,
  degreesToRadians,
} from './types';

/**
 * Compute spherical harmonic encoding coefficients for a direction.
 * These coefficients can be reused to encode multiple buffers at the same direction.
 *
 * @param azim - Azimuth angle in degrees
 * @param elev - Elevation angle in degrees
 * @param order - Ambisonic order (1 = first order, 2 = second order, etc.)
 * @returns Array of encoding coefficients, one per ambisonic channel
 */
export function computeEncodingCoefficients(
  azim: number,
  elev: number,
  order: number
): Float32Array {
  const nCh = getAmbisonicChannelCount(order);
  const azimRad = degreesToRadians(azim);
  const elevRad = degreesToRadians(elev);

  const shMatrix = jshlib.computeRealSH(order, [[azimRad, elevRad]]);

  const coeffs = new Float32Array(nCh);
  for (let i = 0; i < nCh; i++) {
    coeffs[i] = shMatrix[i][0];
  }

  return coeffs;
}

/**
 * Compute circular harmonic encoding coefficients for 2D encoding.
 *
 * @param azim - Azimuth angle in degrees
 * @param order - Ambisonic order (1 = first order, 2 = second order, etc.)
 * @returns Array of encoding coefficients, one per 2D ambisonic channel
 */
export function computeEncodingCoefficients2D(
  azim: number,
  order: number
): Float32Array {
  const nCh = getAmbisonicChannelCount2D(order);
  const chMatrix = utils.getCircHarmonics(order, [azim]);

  const coeffs = new Float32Array(nCh);
  for (let i = 0; i < nCh; i++) {
    coeffs[i] = chMatrix[i][0];
  }

  return coeffs;
}

/**
 * Encode a mono audio buffer to ambisonic channels at a fixed direction.
 * This is useful for offline processing of impulse responses or pre-computed audio.
 *
 * @param monoSamples - Input mono audio samples
 * @param azim - Azimuth angle in degrees (positive = counterclockwise from front)
 * @param elev - Elevation angle in degrees (positive = up)
 * @param order - Ambisonic order (1 = first order with 4 channels, 2 = 9 channels, etc.)
 * @returns Array of Float32Arrays, one per ambisonic channel (ACN ordering, N3D normalization)
 *
 * @example
 * ```typescript
 * // Encode a reflection impulse response at 45° azimuth, 0° elevation
 * const monoIR = new Float32Array([...]); // Your impulse response
 * const ambisonicIR = encodeBuffer(monoIR, 45, 0, 1);
 * // ambisonicIR[0] = W channel, [1] = Y, [2] = Z, [3] = X (ACN order)
 * ```
 */
export function encodeBuffer(
  monoSamples: Float32Array,
  azim: number,
  elev: number,
  order: number
): Float32Array[] {
  const nCh = getAmbisonicChannelCount(order);
  const numSamples = monoSamples.length;

  // Compute encoding coefficients
  const coeffs = computeEncodingCoefficients(azim, elev, order);

  // Create output buffers
  const output: Float32Array[] = new Array(nCh);
  for (let ch = 0; ch < nCh; ch++) {
    output[ch] = new Float32Array(numSamples);
    const coeff = coeffs[ch];

    // Apply encoding gain to each sample
    for (let i = 0; i < numSamples; i++) {
      output[ch][i] = monoSamples[i] * coeff;
    }
  }

  return output;
}

/**
 * Encode a mono audio buffer to 2D ambisonic channels (horizontal plane only).
 *
 * @param monoSamples - Input mono audio samples
 * @param azim - Azimuth angle in degrees (positive = counterclockwise from front)
 * @param order - Ambisonic order (1 = first order with 3 channels, 2 = 5 channels, etc.)
 * @returns Array of Float32Arrays, one per 2D ambisonic channel
 */
export function encodeBuffer2D(
  monoSamples: Float32Array,
  azim: number,
  order: number
): Float32Array[] {
  const nCh = getAmbisonicChannelCount2D(order);
  const numSamples = monoSamples.length;

  // Compute encoding coefficients
  const coeffs = computeEncodingCoefficients2D(azim, order);

  // Create output buffers
  const output: Float32Array[] = new Array(nCh);
  for (let ch = 0; ch < nCh; ch++) {
    output[ch] = new Float32Array(numSamples);
    const coeff = coeffs[ch];

    // Apply encoding gain to each sample
    for (let i = 0; i < numSamples; i++) {
      output[ch][i] = monoSamples[i] * coeff;
    }
  }

  return output;
}

/**
 * Encode a mono buffer using a Cartesian direction vector.
 *
 * @param monoSamples - Input mono audio samples
 * @param x - X component of direction vector
 * @param y - Y component of direction vector
 * @param z - Z component of direction vector
 * @param order - Ambisonic order
 * @param coords - Coordinate system convention (default: 'ambisonics')
 * @returns Array of Float32Arrays, one per ambisonic channel
 */
export function encodeBufferFromDirection(
  monoSamples: Float32Array,
  x: number,
  y: number,
  z: number,
  order: number,
  coords: CoordinateSystem = 'ambisonics'
): Float32Array[] {
  let ax = x, ay = y, az = z;

  if (coords === 'threejs') {
    // Three.js: +Z forward, +Y up, +X right
    // Ambisonics: +X forward, +Y left, +Z up
    ax = z;
    ay = -x;
    az = y;
  }

  // Convert Cartesian to spherical
  const [[azimRad, elevRad]] = jshlib.convertCart2Sph([[ax, ay, az]], 1) as [number, number][];
  const azim = azimRad * 180 / Math.PI;
  const elev = elevRad * 180 / Math.PI;

  return encodeBuffer(monoSamples, azim, elev, order);
}

/**
 * Encode a mono buffer to 2D ambisonics using a Cartesian direction vector.
 * Only the horizontal plane (x, y) components are used; z is ignored.
 *
 * @param monoSamples - Input mono audio samples
 * @param x - X component of direction vector
 * @param y - Y component of direction vector
 * @param z - Z component (ignored for 2D encoding)
 * @param order - Ambisonic order
 * @param coords - Coordinate system convention (default: 'ambisonics')
 * @returns Array of Float32Arrays, one per 2D ambisonic channel
 */
export function encodeBuffer2DFromDirection(
  monoSamples: Float32Array,
  x: number,
  y: number,
  z: number,
  order: number,
  coords: CoordinateSystem = 'ambisonics'
): Float32Array[] {
  let ax = x, ay = y;

  if (coords === 'threejs') {
    // Three.js: +Z forward, +X right
    // Ambisonics: +X forward, +Y left
    ax = z;
    ay = -x;
  }

  const azim = Math.atan2(ay, ax) * 180 / Math.PI;

  return encodeBuffer2D(monoSamples, azim, order);
}

/**
 * Encode multiple mono buffers at different directions and sum them.
 * Useful for encoding multiple reflections into a single ambisonic IR.
 *
 * @param sources - Array of {samples, azim, elev} objects
 * @param order - Ambisonic order
 * @returns Array of Float32Arrays containing the summed ambisonic output
 */
export function encodeAndSumBuffers(
  sources: Array<{ samples: Float32Array; azim: number; elev: number }>,
  order: number
): Float32Array[] {
  if (sources.length === 0) {
    const nCh = getAmbisonicChannelCount(order);
    return Array.from({ length: nCh }, () => new Float32Array(0));
  }

  // Find the maximum length
  const maxLength = Math.max(...sources.map((s) => s.samples.length));
  const nCh = getAmbisonicChannelCount(order);

  // Initialize output buffers
  const output: Float32Array[] = Array.from(
    { length: nCh },
    () => new Float32Array(maxLength)
  );

  // Encode and sum each source
  for (const source of sources) {
    const encoded = encodeBuffer(source.samples, source.azim, source.elev, order);

    for (let ch = 0; ch < nCh; ch++) {
      for (let i = 0; i < source.samples.length; i++) {
        output[ch][i] += encoded[ch][i];
      }
    }
  }

  return output;
}
