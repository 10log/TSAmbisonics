import { AmbisonicProcessor, MirrorPlane } from './types';
export default class sceneMirror2D implements AmbisonicProcessor {
    readonly ctx: AudioContext;
    readonly order: number;
    readonly nCh: number;
    readonly in: ChannelSplitterNode;
    readonly out: ChannelMergerNode;
    mirrorPlane: MirrorPlane;
    private gains;
    constructor(audioCtx: AudioContext, order: number);
    reset(): void;
    mirror(planeNo: MirrorPlane): void;
}
//# sourceMappingURL=ambi-sceneMirror2D.d.ts.map