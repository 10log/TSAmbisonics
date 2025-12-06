import { InitializableProcessor, OrientableProcessor } from './types';
export default class monoEncoder2D implements InitializableProcessor, OrientableProcessor {
    readonly ctx: AudioContext;
    readonly order: number;
    readonly nCh: number;
    readonly in: GainNode;
    readonly out: ChannelMergerNode;
    initialized: boolean;
    azim: number;
    elev: number;
    private gainNodes;
    constructor(audioCtx: AudioContext, order: number);
    updateGains(): void;
}
//# sourceMappingURL=ambi-monoEncoder2D.d.ts.map