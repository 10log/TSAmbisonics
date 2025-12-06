/** Intensity analysis result: [azimuth, elevation, diffuseness, energy] */
export type IntensityParams2D = [number, number, number, number];
export default class intensityAnalyser2D {
    readonly ctx: AudioContext;
    readonly fftSize: number;
    readonly in: ChannelSplitterNode;
    readonly out: ChannelMergerNode;
    private gains;
    private analysers;
    private analBuffers;
    constructor(audioCtx: AudioContext);
    updateBuffers(): void;
    computeIntensity(): IntensityParams2D;
}
//# sourceMappingURL=ambi-intensityAnalyser2D.d.ts.map