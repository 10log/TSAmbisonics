import { AmbisonicProcessor } from './types';
export default class rmsAnalyser implements AmbisonicProcessor {
    readonly ctx: AudioContext;
    readonly order: number;
    readonly nCh: number;
    readonly in: ChannelSplitterNode;
    readonly out: ChannelMergerNode;
    readonly fftSize: number;
    private analysers;
    private analBuffers;
    constructor(audioCtx: AudioContext, order: number);
    updateBuffers(): void;
    computeRMS(): number[];
}
//# sourceMappingURL=ambi-rmsAnalyser.d.ts.map