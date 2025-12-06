import { AmbisonicProcessor } from './types';
export default class sceneRotator2D implements AmbisonicProcessor {
    readonly ctx: AudioContext;
    readonly order: number;
    readonly nCh: number;
    readonly in: ChannelSplitterNode;
    readonly out: ChannelMergerNode;
    yaw: number;
    private rotMtxNodes;
    constructor(audioCtx: AudioContext, order: number);
    updateRotMtx(): void;
}
//# sourceMappingURL=ambi-sceneRotator2D.d.ts.map