import { AmbisonicProcessor } from './types';
export default class orderLimiter implements AmbisonicProcessor {
    readonly ctx: AudioContext;
    readonly orderIn: number;
    readonly nChIn: number;
    readonly in: ChannelSplitterNode;
    orderOut: number;
    nChOut: number;
    out: ChannelMergerNode;
    get order(): number;
    get nCh(): number;
    constructor(audioCtx: AudioContext, orderIn: number, orderOut: number);
    updateOrder(orderOut: number): void;
}
//# sourceMappingURL=ambi-orderLimiter.d.ts.map