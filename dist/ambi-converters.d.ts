export declare class wxyz2acn {
    readonly ctx: AudioContext;
    readonly in: ChannelSplitterNode;
    readonly out: ChannelMergerNode;
    private gains;
    constructor(audioCtx: AudioContext);
}
export declare class acn2wxyz {
    readonly ctx: AudioContext;
    readonly in: ChannelSplitterNode;
    readonly out: ChannelMergerNode;
    private gains;
    constructor(audioCtx: AudioContext);
}
export declare class sn3d2n3d {
    readonly ctx: AudioContext;
    readonly order: number;
    readonly nCh: number;
    readonly in: ChannelSplitterNode;
    readonly out: ChannelMergerNode;
    private gains;
    constructor(audioCtx: AudioContext, order: number);
}
export declare class n3d2sn3d {
    readonly ctx: AudioContext;
    readonly order: number;
    readonly nCh: number;
    readonly in: ChannelSplitterNode;
    readonly out: ChannelMergerNode;
    private gains;
    constructor(audioCtx: AudioContext, order: number);
}
export declare class fuma2acn {
    readonly ctx: AudioContext;
    readonly order: number;
    readonly nCh: number;
    readonly in: ChannelSplitterNode;
    readonly out: ChannelMergerNode;
    private gains;
    private remapArray;
    constructor(audioCtx: AudioContext, order: number);
}
//# sourceMappingURL=ambi-converters.d.ts.map