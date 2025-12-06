import { AmbisonicProcessor } from './types';
/** Speaker position in spherical coordinates: [azimuth, elevation, distance] */
export type SpeakerPosition = [number, number, number];
export default class decoder implements AmbisonicProcessor {
    readonly ctx: AudioContext;
    readonly order: number;
    readonly nCh: number;
    readonly in: ChannelSplitterNode;
    out: ChannelMergerNode;
    nSpk: number;
    private _decodingMatrix;
    private _spkSphPosArray;
    private mtxGain;
    constructor(audioCtx: AudioContext, order: number);
    set speakerPos(spkSphPosArray: SpeakerPosition[] | undefined);
    get speakerPos(): SpeakerPosition[];
    private _updateDecodeMtx;
    private _getDefaultSpkConfig;
}
//# sourceMappingURL=ambi-decoder.d.ts.map