import { AmbisonicProcessor } from './types';
export default class orderWeight implements AmbisonicProcessor {
    readonly ctx: AudioContext;
    readonly order: number;
    readonly nCh: number;
    readonly in: ChannelSplitterNode;
    readonly out: ChannelMergerNode;
    orderGains: number[];
    private gains;
    constructor(audioCtx: AudioContext, order: number);
    updateOrderGains(): void;
    computeMaxRECoeffs(): void;
}
//# sourceMappingURL=ambi-orderWeight.d.ts.map