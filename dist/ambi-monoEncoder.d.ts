import { InitializableProcessor, OrientableProcessor, CoordinateSystem } from './types';
export default class monoEncoder implements InitializableProcessor, OrientableProcessor {
    readonly ctx: AudioContext;
    readonly order: number;
    readonly nCh: number;
    readonly in: GainNode;
    readonly out: ChannelMergerNode;
    initialized: boolean;
    azim: number;
    elev: number;
    private gains;
    private gainNodes;
    constructor(audioCtx: AudioContext, order: number);
    updateGains(): void;
    /**
     * Set the encoding direction from a Cartesian direction vector.
     * The vector does not need to be normalized.
     *
     * Note: A zero-length vector (0, 0, 0) results in undefined behavior
     * from the underlying spherical harmonic library.
     *
     * @param x - X component of direction vector
     * @param y - Y component of direction vector
     * @param z - Z component of direction vector
     * @param coords - Coordinate system convention (default: 'ambisonics')
     *   - 'ambisonics': +X forward, +Y left, +Z up
     *   - 'threejs': +Z forward, +Y up, +X right
     */
    setDirection(x: number, y: number, z: number, coords?: CoordinateSystem): void;
    /**
     * Get the current encoding direction as a Cartesian unit vector.
     *
     * @param coords - Coordinate system convention (default: 'ambisonics')
     * @returns Direction as [x, y, z] unit vector
     */
    getDirection(coords?: CoordinateSystem): [number, number, number];
}
//# sourceMappingURL=ambi-monoEncoder.d.ts.map