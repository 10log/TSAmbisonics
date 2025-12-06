import { LoaderCallback } from './types';
export default class HOAloader {
    readonly context: AudioContext;
    readonly order: number;
    readonly nCh: number;
    readonly nChGroups: number;
    readonly onLoad: LoaderCallback;
    readonly urls: string[];
    private buffers;
    private loadCount;
    private loaded;
    private fileExt;
    private concatBuffer;
    constructor(context: AudioContext, order: number, url: string, callback: LoaderCallback);
    loadBuffers(url: string, index: number): void;
    load(): void;
    concatBuffers(): void;
}
//# sourceMappingURL=hoa-loader.d.ts.map