/** Intensity analysis result: [azimuth, elevation, diffuseness, energy] */
export type IntensityParams = [number, number, number, number];
export default class intensityAnalyser {
    readonly ctx: AudioContext;
    readonly fftSize: number;
    readonly in: ChannelSplitterNode;
    readonly out: ChannelMergerNode;
    private gains;
    private analysers;
    private analBuffers;
    constructor(audioCtx: AudioContext);
    updateBuffers(): void;
    computeIntensity(): IntensityParams;
}
//# sourceMappingURL=ambi-intensityAnalyser.d.ts.map