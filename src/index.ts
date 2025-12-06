// JSAmbisonics - A Web Audio library for ambisonic processing
// Main entry point - exports all public classes and utilities

// Core types
export type {
  AmbisonicProcessor,
  InitializableProcessor,
  OrientableProcessor,
  RotatableProcessor,
  VmicPattern,
  MirrorPlane,
  LoaderCallback,
} from './types';

export {
  getAmbisonicChannelCount,
  getAmbisonicChannelCount2D,
  degreesToRadians,
  radiansToDegrees,
} from './types';

// Encoders
export { default as monoEncoder } from './ambi-monoEncoder';
export { default as monoEncoder2D } from './ambi-monoEncoder2D';

// Order processing
export { default as orderLimiter } from './ambi-orderLimiter';
export { default as orderLimiter2D } from './ambi-orderLimiter2D';
export { default as orderWeight } from './ambi-orderWeight';

// Scene manipulation
export { default as sceneRotator } from './ambi-sceneRotator';
export { default as sceneRotator2D } from './ambi-sceneRotator2D';
export { default as sceneMirror } from './ambi-sceneMirror';
export { default as sceneMirror2D } from './ambi-sceneMirror2D';

// Decoders
export { default as binDecoder } from './ambi-binauralDecoder';
export { default as binDecoder2D } from './ambi-binauralDecoder2D';
export { default as decoder } from './ambi-decoder';
export type { SpeakerPosition } from './ambi-decoder';

// Processing
export { default as convolver } from './ambi-convolver';
export { default as virtualMic } from './ambi-virtualMic';

// Analysers
export { default as rmsAnalyser } from './ambi-rmsAnalyser';
export { default as powermapAnalyser } from './ambi-powermapAnalyser';
export type { PowerValue, PowermapMode } from './ambi-powermapAnalyser';
export { default as intensityAnalyser } from './ambi-intensityAnalyser';
export type { IntensityParams } from './ambi-intensityAnalyser';
export { default as intensityAnalyser2D } from './ambi-intensityAnalyser2D';
export type { IntensityParams2D } from './ambi-intensityAnalyser2D';

// Loaders
export { default as HOAloader } from './hoa-loader';
export { default as HRIRloader_local } from './hrir-loader_local';
export { default as HRIRloader2D_local } from './hrir-loader2D_local';
export { default as HRIRloader_ircam } from './hrir-loader_ircam';

// Converters
import * as _converters from './ambi-converters';
export const converters = _converters;

// Utilities (JavaScript with type declarations)
import * as _utils from './utils';
export const utils = _utils;
