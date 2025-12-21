/**
 * Core types for JSAmbisonics library
 */

/**
 * Base interface for all ambisonic processor nodes.
 * All processors expose an input and output node for Web Audio connections.
 */
export interface AmbisonicProcessor {
  readonly ctx: AudioContext;
  readonly order: number;
  readonly nCh: number;
  readonly in: AudioNode;
  readonly out: AudioNode;
}

/**
 * Processor that has been fully initialized and is ready for use.
 */
export interface InitializableProcessor extends AmbisonicProcessor {
  initialized: boolean;
}

/**
 * Processor with azimuth/elevation orientation control.
 */
export interface OrientableProcessor extends AmbisonicProcessor {
  azim: number;
  elev: number;
}

/**
 * Processor with yaw/pitch/roll rotation control.
 */
export interface RotatableProcessor extends AmbisonicProcessor {
  yaw: number;
  pitch: number;
  roll: number;
}

/**
 * Virtual microphone patterns supported by the library.
 */
export type VmicPattern = 'cardioid' | 'supercardioid' | 'hypercardioid' | 'max_rE';

/**
 * Mirror plane options: 0 = none, 1 = front-back, 2 = left-right, 3 = up-down
 */
export type MirrorPlane = 0 | 1 | 2 | 3;

/**
 * Callback invoked when audio buffer loading completes.
 */
export type LoaderCallback = (buffer: AudioBuffer) => void;

/**
 * Coordinate system conventions for direction vectors.
 * - 'ambisonics': +X forward, +Y left, +Z up (default ambisonic convention)
 * - 'threejs': +Z forward, +Y up, +X right (Three.js/WebGL convention)
 */
export type CoordinateSystem = 'ambisonics' | 'threejs';

/**
 * Calculates the number of ambisonic channels for a given order (3D).
 * Formula: (order + 1)^2
 */
export function getAmbisonicChannelCount(order: number): number {
  return (order + 1) * (order + 1);
}

/**
 * Calculates the number of ambisonic channels for a given order (2D).
 * Formula: 2 * order + 1
 */
export function getAmbisonicChannelCount2D(order: number): number {
  return 2 * order + 1;
}

/**
 * Converts degrees to radians.
 */
export function degreesToRadians(degrees: number): number {
  return degrees * Math.PI / 180;
}

/**
 * Converts radians to degrees.
 */
export function radiansToDegrees(radians: number): number {
  return radians * 180 / Math.PI;
}
