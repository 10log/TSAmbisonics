import { InitializableProcessor, OrientableProcessor, VmicPattern } from './types';
export default class virtualMic implements InitializableProcessor, OrientableProcessor {
    readonly ctx: AudioContext;
    readonly order: number;
    readonly nCh: number;
    readonly in: ChannelSplitterNode;
    readonly out: GainNode;
    initialized: boolean;
    azim: number;
    elev: number;
    vmicPattern: VmicPattern;
    private vmicGains;
    private vmicGainNodes;
    private vmicCoeffs;
    private SHxyz;
    constructor(audioCtx: AudioContext, order: number);
    updatePattern(): void;
    updateOrientation(): void;
    private updateGains;
    private computeCardioidCoeffs;
    private computeHypercardCoeffs;
    private computeSupercardCoeffs;
    private computeMaxRECoeffs;
}
//# sourceMappingURL=ambi-virtualMic.d.ts.map