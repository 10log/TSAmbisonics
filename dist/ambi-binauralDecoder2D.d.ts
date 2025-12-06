import { InitializableProcessor } from './types';
export default class binDecoder2D implements InitializableProcessor {
    readonly ctx: AudioContext;
    readonly order: number;
    readonly nCh: number;
    readonly in: ChannelSplitterNode;
    readonly out: ChannelMergerNode;
    initialized: boolean;
    private decFilters;
    private decFilterNodes;
    private gainMid;
    private gainSide;
    private invertSide;
    constructor(audioCtx: AudioContext, order: number);
    updateFilters(audioBuffer: AudioBuffer): void;
    resetFilters(): void;
}
//# sourceMappingURL=ambi-binauralDecoder2D.d.ts.map