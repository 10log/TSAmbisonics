import { InitializableProcessor } from './types';
export default class convolver implements InitializableProcessor {
    readonly ctx: AudioContext;
    readonly order: number;
    readonly nCh: number;
    readonly in: GainNode;
    readonly out: ChannelMergerNode;
    initialized: boolean;
    private encFilters;
    private encFilterNodes;
    constructor(audioCtx: AudioContext, order: number);
    updateFilters(audioBuffer: AudioBuffer): void;
}
//# sourceMappingURL=ambi-convolver.d.ts.map