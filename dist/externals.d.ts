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

declare module 'numeric' {
  export type Matrix = number[][];
  export type Vector = number[];

  export function identity(n: number): Matrix;
  export function transpose(A: Matrix): Matrix;
  export function dot(A: Matrix | Vector, B: Matrix | Vector): Matrix | Vector | number;
  export function dotMV(A: Matrix, v: Vector): Vector;
  export function dotVM(v: Vector, A: Matrix): Vector;
  export function dotVV(v1: Vector, v2: Vector): number;
  export function dotMMsmall(A: Matrix, B: Matrix): Matrix;
  export function mul(scalar: number | Vector | Matrix, A: Matrix | Vector): Matrix | Vector;
  export function div(A: Vector | Matrix | number[], scalar: number): Vector | Matrix | number[];
  export function neg(A: Matrix): Matrix;
  export function add(A: Matrix | Vector | number, B: Matrix | Vector | number, ...rest: (Matrix | Vector | number)[]): Matrix | Vector;
  export function sub(A: Matrix | Vector, B: Matrix | Vector): Matrix | Vector;
  export function pow(A: Vector | number[], exp: number): Vector | number[];
  export function sum(A: Vector | number[]): number;
  export function sin(A: Vector | number[]): Vector | number[];
  export function cos(A: Vector | number[]): Vector | number[];
  export function round(A: Vector | number[]): Vector | number[];
  export function mod(A: Vector | number[], m: number): Vector | number[];
  export function inv(A: Matrix): Matrix;
  export function det(A: Matrix): number;
  export function eig(A: Matrix): { lambda: { x: Vector; y: Vector }; E: { x: Matrix; y: Matrix } };
  export function svd(A: Matrix): { U: Matrix; S: Vector; V: Matrix };
  export function diag(v: Vector): Matrix;
  export function rep(dims: number[], value: number): Matrix | Vector;
  export function clone<T>(x: T): T;
}

declare module 'get-float-time-domain-data' {
  export default function getFloatTimeDomainData(analyser: AnalyserNode, array: Float32Array): void;
}

declare module 'convex-hull' {
  export default function convexHull(points: number[][]): number[][];
}

// Type declarations for the local utils module
declare module './utils' {
  /** Direction in degrees with optional distance [azimuth, elevation, distance?] */
  export type DirectionDeg = [number, number] | [number, number, number];

  /** Direction in radians with optional distance [azimuth, elevation, distance?] */
  export type DirectionRad = [number, number] | [number, number, number];

  /** Convert degrees to radians for direction arrays */
  export function deg2rad(aedArrayIn: DirectionDeg[]): DirectionRad[];

  /** Convert radians to degrees for direction arrays */
  export function rad2deg(aedArrayIn: DirectionRad[]): DirectionDeg[];

  /** Get a specific column from a 2D array */
  export function getColumn<T>(anArray: T[][], columnNumber: number): T[];

  /** Sample equidistant points on a circle for 2D virtual speakers */
  export function sampleCircle(numPoints: number): [number, number, number][];

  /** Calculate circular harmonics of arbitrary order */
  export function getCircHarmonics(order: number, phis: number[]): number[][];

  /** Get ambisonic decoding matrix using ALLRAD method */
  export function getAmbisonicDecMtx(
    hrtf_dirs_deg: DirectionDeg[],
    order: number
  ): number[][];

  /** Create lookup table for fast nearest-neighbor finding */
  export function createNearestLookup(
    dirs_deg: [number, number][],
    ang_res: [number, number]
  ): number[];

  /** Find nearest directions using precomputed lookup table */
  export function findNearest(
    dirs_deg: DirectionDeg[],
    nearestLookup: number[],
    ang_res: [number, number]
  ): number[];

  /**
   * Get t-design speaker positions for a given degree.
   * Returns [azimuth, elevation, distance] tuples.
   * @param degree - T-design degree (1-21)
   */
  export function getTdesign(degree: number): [number, number, number][];
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
