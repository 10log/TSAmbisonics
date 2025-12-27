/**
 * Type declarations for external dependencies without their own types
 */

declare module 'spherical-harmonic-transform' {
  /** Spherical coordinates as [azimuth, elevation] in radians */
  export type SphericalCoord = [number, number];

  /** Spherical coordinates with magnitude as [azimuth, elevation, radius] */
  export type SphericalCoordWithMag = [number, number, number];

  /** Cartesian coordinates as [x, y, z] */
  export type CartesianCoord = [number, number, number];

  /** 2D matrix type (array of arrays) */
  export type Matrix = number[][];

  /** 3x3 rotation matrix */
  export type RotationMatrix3x3 = [
    [number, number, number],
    [number, number, number],
    [number, number, number]
  ];

  /**
   * Compute real spherical harmonics for given directions.
   * @param N - Maximum order
   * @param data - Array of [azimuth, elevation] pairs in radians
   * @returns SH matrix of size [nSH x nDirs]
   */
  export function computeRealSH(N: number, data: SphericalCoord[]): Matrix;

  /**
   * Compute rotation matrix for spherical harmonics.
   * @param Rxyz - 3x3 rotation matrix
   * @param L - Maximum SH order
   * @returns Rotation matrix for SH coefficients
   */
  export function getSHrotMtx(Rxyz: Matrix, L: number): Matrix;

  /**
   * Convert yaw/pitch/roll angles to rotation matrix.
   * @param yaw - Yaw angle in radians
   * @param pitch - Pitch angle in radians
   * @param roll - Roll angle in radians
   * @returns 3x3 rotation matrix
   */
  export function yawPitchRoll2Rzyx(yaw: number, pitch: number, roll: number): Matrix;

  /**
   * Compute factorial of n.
   */
  export function factorial(n: number): number;

  /**
   * Recursive Legendre polynomial computation.
   * @param n - Polynomial order
   * @param x - Evaluation points
   * @param Pnm_minus1 - Previous polynomial values
   * @param Pnm_minus2 - Second previous polynomial values
   */
  export function recurseLegendrePoly(
    n: number,
    x: number[],
    Pnm_minus1: Matrix | number,
    Pnm_minus2: Matrix | number
  ): Matrix;

  /**
   * Forward spherical harmonic transform.
   */
  export function forwardSHT(
    N: number,
    data: SphericalCoordWithMag[] | CartesianCoord[],
    CART_OR_SPH: 0 | 1,
    DIRECT_OR_PINV: 0 | 1
  ): number[];

  /**
   * Inverse spherical harmonic transform.
   */
  export function inverseSHT(coeffs: number[], aziElev: SphericalCoord[]): SphericalCoordWithMag[];

  /**
   * Convert cartesian to spherical coordinates.
   */
  export function convertCart2Sph(xyz: CartesianCoord[], OMIT_MAG?: 0 | 1): SphericalCoord[] | SphericalCoordWithMag[];

  /**
   * Convert spherical to cartesian coordinates.
   */
  export function convertSph2Cart(aziElevR: SphericalCoord[] | SphericalCoordWithMag[]): CartesianCoord[];

  /**
   * Pseudo-inverse using SVD.
   */
  export function pinv_svd(A: Matrix): Matrix;

  /**
   * Pseudo-inverse using direct method.
   */
  export function pinv_direct(A: Matrix): Matrix;

  /**
   * Print 2D array to console.
   */
  export function print2Darray(array2D: Matrix): void;
}

declare module 'get-float-time-domain-data' {
  export default function getFloatTimeDomainData(analyser: AnalyserNode, array: Float32Array): void;
}

declare module 'convex-hull' {
  export default function convexHull(points: number[][]): number[][];
}

declare module 'serve-sofa-hrir' {
  export interface HrtfSetOptions {
    audioContext: AudioContext;
    coordinateSystem?: 'sofaSpherical' | 'gl';
  }

  export interface HrtfEntry {
    position: [number, number, number];
    fir: AudioBuffer;
  }

  export class HrtfSet {
    constructor(options: HrtfSetOptions);
    load(url: string): Promise<void>;
    nearest(position: [number, number] | [number, number, number]): HrtfEntry;
  }
}
