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
