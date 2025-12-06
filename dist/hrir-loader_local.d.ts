import { LoaderCallback } from './types';
/** SOFA JSON structure for HRIR data */
interface SofaHrirSet {
    leaves: Array<{
        data: number[] | number[][] | [number, number][] | [number[], number[]][];
    }>;
}
/** HRIR pair [left, right] */
type HrirPair = [Float64Array, Float64Array];
export default class HRIRloader_local {
    readonly context: AudioContext;
    readonly order: number;
    readonly nCh: number;
    readonly onLoad: LoaderCallback;
    readonly vls_dirs_deg: [number, number, number][];
    readonly nVLS: number;
    readonly nearestLookupRes: [number, number];
    private fs;
    private nSamples;
    private hrir_dirs_deg;
    private hrirs;
    private nearestLookup;
    private nearest_dirs_deg;
    private vls_hrirs;
    private decodingMatrix;
    private hoaBuffer;
    constructor(context: AudioContext, order: number, callback: LoaderCallback);
    load(setUrl: string): void;
    parseHrirFromJSON(hrirSet: SofaHrirSet): void;
    getClosestDirs(nearestIdx: number[], hrir_dirs_deg: [number, number][]): [number, number][];
    getClosestHrirFilters(nearestIdx: number[], hrirs: HrirPair[]): HrirPair[];
    computeDecFilters(): void;
    getHoaFilterFromHrirFilter(nCh: number, nSamples: number, sampleRate: number, hrirs: HrirPair[], decodingMatrix: number[][]): AudioBuffer;
}
export {};
//# sourceMappingURL=hrir-loader_local.d.ts.map