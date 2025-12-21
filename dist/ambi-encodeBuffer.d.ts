import { CoordinateSystem } from './types';
/**
 * Compute spherical harmonic encoding coefficients for a direction.
 * These coefficients can be reused to encode multiple buffers at the same direction.
 *
 * @param azim - Azimuth angle in degrees
 * @param elev - Elevation angle in degrees
 * @param order - Ambisonic order (1 = first order, 2 = second order, etc.)
 * @returns Array of encoding coefficients, one per ambisonic channel
 */
export declare function computeEncodingCoefficients(azim: number, elev: number, order: number): Float32Array;
/**
 * Compute circular harmonic encoding coefficients for 2D encoding.
 *
 * @param azim - Azimuth angle in degrees
 * @param order - Ambisonic order (1 = first order, 2 = second order, etc.)
 * @returns Array of encoding coefficients, one per 2D ambisonic channel
 */
export declare function computeEncodingCoefficients2D(azim: number, order: number): Float32Array;
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
export declare function encodeBuffer(monoSamples: Float32Array, azim: number, elev: number, order: number): Float32Array[];
/**
 * Encode a mono audio buffer to 2D ambisonic channels (horizontal plane only).
 *
 * @param monoSamples - Input mono audio samples
 * @param azim - Azimuth angle in degrees (positive = counterclockwise from front)
 * @param order - Ambisonic order (1 = first order with 3 channels, 2 = 5 channels, etc.)
 * @returns Array of Float32Arrays, one per 2D ambisonic channel
 */
export declare function encodeBuffer2D(monoSamples: Float32Array, azim: number, order: number): Float32Array[];
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
export declare function encodeBufferFromDirection(monoSamples: Float32Array, x: number, y: number, z: number, order: number, coords?: CoordinateSystem): Float32Array[];
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
export declare function encodeBuffer2DFromDirection(monoSamples: Float32Array, x: number, y: number, z: number, order: number, coords?: CoordinateSystem): Float32Array[];
/**
 * Encode multiple mono buffers at different directions and sum them.
 * Useful for encoding multiple reflections into a single ambisonic IR.
 *
 * @param sources - Array of {samples, azim, elev} objects
 * @param order - Ambisonic order
 * @returns Array of Float32Arrays containing the summed ambisonic output
 */
export declare function encodeAndSumBuffers(sources: Array<{
    samples: Float32Array;
    azim: number;
    elev: number;
}>, order: number): Float32Array[];
//# sourceMappingURL=ambi-encodeBuffer.d.ts.map