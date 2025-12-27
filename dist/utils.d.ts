////////////////////////////////////////////////////////////////////
//  Type declarations for utils.js
//  This file provides TypeScript types for the utils module
////////////////////////////////////////////////////////////////////

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

/** Numeric utilities object (inline replacements for numeric library) */
export const numeric: {
  mul(a: number | number[] | number[][], b: number | number[] | number[][]): number | number[] | number[][];
  div(arr: number | number[], scalar: number): number | number[];
  sin(arr: number[]): number[];
  cos(arr: number[]): number[];
  pow(arr: number[], exp: number): number[];
  sum(arr: number[]): number;
  dotVV(a: number[], b: number[]): number;
  sub(a: number | number[], b: number | number[]): number | number[];
  round(arr: number | number[]): number | number[];
  mod(arr: number | number[], m: number): number | number[];
  add(...args: (number | number[])[]): number | number[];
  transpose(m: number[][]): number[][];
  dotMMsmall(A: number[][], B: number[][]): number[][];
  inv(m: number[][]): number[][];
  identity(n: number): number[][];
  diag(v: number[]): number[][];
  dot(A: number[] | number[][], B: number[] | number[][]): number | number[] | number[][];
};
