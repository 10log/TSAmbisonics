import { AmbisonicProcessor, RotatableProcessor } from './types';
export default class sceneRotator implements AmbisonicProcessor, RotatableProcessor {
    readonly ctx: AudioContext;
    readonly order: number;
    readonly nCh: number;
    readonly in: ChannelSplitterNode;
    readonly out: ChannelMergerNode;
    yaw: number;
    pitch: number;
    roll: number;
    private rotMtx;
    private rotMtxNodes;
    constructor(audioCtx: AudioContext, order: number);
    updateRotMtx(): void;
}
//# sourceMappingURL=ambi-sceneRotator.d.ts.map