import { InitializableProcessor, OrientableProcessor, CoordinateSystem } from './types';
export default class monoEncoder2D implements InitializableProcessor, OrientableProcessor {
    readonly ctx: AudioContext;
    readonly order: number;
    readonly nCh: number;
    readonly in: GainNode;
    readonly out: ChannelMergerNode;
    initialized: boolean;
    azim: number;
    elev: number;
    private gainNodes;
    constructor(audioCtx: AudioContext, order: number);
    updateGains(): void;
    /**
     * Set the encoding direction from a Cartesian direction vector.
     * Only the horizontal plane (x, y) components are used; z is ignored.
     * The vector does not need to be normalized.
     *
     * @param x - X component of direction vector
     * @param y - Y component of direction vector
     * @param z - Z component (ignored for 2D encoding)
     * @param coords - Coordinate system convention (default: 'ambisonics')
     *   - 'ambisonics': +X forward, +Y left, +Z up
     *   - 'threejs': +Z forward, +Y up, +X right
     */
    setDirection(x: number, y: number, z: number, coords?: CoordinateSystem): void;
    /**
     * Get the current encoding direction as a Cartesian unit vector.
     * The z component will always be 0 for 2D encoding.
     *
     * @param coords - Coordinate system convention (default: 'ambisonics')
     * @returns Direction as [x, y, z] unit vector (z always 0)
     */
    getDirection(coords?: CoordinateSystem): [number, number, number];
}
//# sourceMappingURL=ambi-monoEncoder2D.d.ts.map