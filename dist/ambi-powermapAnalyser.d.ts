import { AmbisonicProcessor } from './types';
/** Power value at direction: [azimuth_rad, elevation_rad, power] */
export type PowerValue = [number, number, number];
/** Powermap mode: 0 = directional power values, 1 = SH coefficients */
export type PowermapMode = 0 | 1;
export default class powermapAnalyser implements AmbisonicProcessor {
    readonly ctx: AudioContext;
    readonly order: number;
    readonly nCh: number;
    readonly fftSize: number;
    readonly in: ChannelSplitterNode;
    readonly out: ChannelMergerNode;
    mode: PowermapMode;
    private analysers;
    private analBuffers;
    private td_dirs_rad;
    private SHmtx;
    constructor(audioCtx: AudioContext, order: number, mode: PowermapMode);
    updateBuffers(): void;
    computePowermap(): PowerValue[] | number[];
}
//# sourceMappingURL=ambi-powermapAnalyser.d.ts.map