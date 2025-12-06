import { LoaderCallback } from './types';
import * as serveSofaHrir from 'serve-sofa-hrir';
export default class HRIRloader_ircam {
    readonly context: AudioContext;
    readonly order: number;
    readonly nCh: number;
    readonly onLoad: LoaderCallback;
    readonly hrtfSet: serveSofaHrir.HrtfSet;
    readonly wishedSpeakerPos: [number, number, number][];
    private hrirBuffer;
    private decodingMatrix;
    private hoaBuffer;
    constructor(context: AudioContext, order: number, callback: LoaderCallback);
    load(setUrl: string): void;
    getHoaFilterFromHrirFilter(): AudioBuffer;
}
//# sourceMappingURL=hrir-loader_ircam.d.ts.map