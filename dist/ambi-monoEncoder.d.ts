import { InitializableProcessor, OrientableProcessor } from './types';
export default class monoEncoder implements InitializableProcessor, OrientableProcessor {
    readonly ctx: AudioContext;
    readonly order: number;
    readonly nCh: number;
    readonly in: GainNode;
    readonly out: ChannelMergerNode;
    initialized: boolean;
    azim: number;
    elev: number;
    private gains;
    private gainNodes;
    constructor(audioCtx: AudioContext, order: number);
    updateGains(): void;
}
//# sourceMappingURL=ambi-monoEncoder.d.ts.map