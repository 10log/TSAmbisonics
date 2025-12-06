/**
 * Tests for sceneMirror class
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { createMockAudioContext } from './setup';
import sceneMirror from '../src/ambi-sceneMirror';

describe('sceneMirror', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  describe('constructor', () => {
    it('creates a mirror with correct order', () => {
      const mirror = new sceneMirror(audioCtx, 1);
      expect(mirror.order).toBe(1);
    });

    it('calculates correct channel count for order 1', () => {
      const mirror = new sceneMirror(audioCtx, 1);
      expect(mirror.nCh).toBe(4);
    });

    it('calculates correct channel count for order 3', () => {
      const mirror = new sceneMirror(audioCtx, 3);
      expect(mirror.nCh).toBe(16);
    });

    it('initializes mirrorPlane to 0 (no mirroring)', () => {
      const mirror = new sceneMirror(audioCtx, 1);
      expect(mirror.mirrorPlane).toBe(0);
    });

    it('stores reference to audio context', () => {
      const mirror = new sceneMirror(audioCtx, 1);
      expect(mirror.ctx).toBe(audioCtx);
    });

    it('creates input and output nodes', () => {
      const mirror = new sceneMirror(audioCtx, 1);
      expect(mirror.in).toBeDefined();
      expect(mirror.out).toBeDefined();
    });
  });

  describe('mirror method', () => {
    it('sets mirrorPlane to 0 for no mirroring', () => {
      const mirror = new sceneMirror(audioCtx, 1);
      mirror.mirror(0);
      expect(mirror.mirrorPlane).toBe(0);
    });

    it('sets mirrorPlane to 1 for front-back (yz-plane)', () => {
      const mirror = new sceneMirror(audioCtx, 1);
      mirror.mirror(1);
      expect(mirror.mirrorPlane).toBe(1);
    });

    it('sets mirrorPlane to 2 for left-right (xz-plane)', () => {
      const mirror = new sceneMirror(audioCtx, 1);
      mirror.mirror(2);
      expect(mirror.mirrorPlane).toBe(2);
    });

    it('sets mirrorPlane to 3 for up-down (xy-plane)', () => {
      const mirror = new sceneMirror(audioCtx, 1);
      mirror.mirror(3);
      expect(mirror.mirrorPlane).toBe(3);
    });

    it('does not throw for any valid plane', () => {
      const mirror = new sceneMirror(audioCtx, 1);
      expect(() => mirror.mirror(0)).not.toThrow();
      expect(() => mirror.mirror(1)).not.toThrow();
      expect(() => mirror.mirror(2)).not.toThrow();
      expect(() => mirror.mirror(3)).not.toThrow();
    });

    it('can switch between mirror planes', () => {
      const mirror = new sceneMirror(audioCtx, 1);
      mirror.mirror(1);
      expect(mirror.mirrorPlane).toBe(1);
      mirror.mirror(2);
      expect(mirror.mirrorPlane).toBe(2);
      mirror.mirror(3);
      expect(mirror.mirrorPlane).toBe(3);
      mirror.mirror(0);
      expect(mirror.mirrorPlane).toBe(0);
    });
  });

  describe('reset method', () => {
    it('does not throw when called', () => {
      const mirror = new sceneMirror(audioCtx, 1);
      expect(() => mirror.reset()).not.toThrow();
    });

    it('can be called after mirroring', () => {
      const mirror = new sceneMirror(audioCtx, 1);
      mirror.mirror(1);
      expect(() => mirror.reset()).not.toThrow();
    });

    it('can be called multiple times', () => {
      const mirror = new sceneMirror(audioCtx, 1);
      mirror.reset();
      mirror.reset();
      expect(() => mirror.reset()).not.toThrow();
    });
  });

  describe('different orders', () => {
    it('creates order 0 mirror with 1 channel', () => {
      const mirror = new sceneMirror(audioCtx, 0);
      expect(mirror.nCh).toBe(1);
    });

    it('creates order 2 mirror with 9 channels', () => {
      const mirror = new sceneMirror(audioCtx, 2);
      expect(mirror.nCh).toBe(9);
    });

    it('creates order 4 mirror with 25 channels', () => {
      const mirror = new sceneMirror(audioCtx, 4);
      expect(mirror.nCh).toBe(25);
    });

    it('higher order mirror can apply all mirror planes', () => {
      const mirror = new sceneMirror(audioCtx, 3);
      expect(() => mirror.mirror(0)).not.toThrow();
      expect(() => mirror.mirror(1)).not.toThrow();
      expect(() => mirror.mirror(2)).not.toThrow();
      expect(() => mirror.mirror(3)).not.toThrow();
    });
  });

  describe('mirroring cycle', () => {
    it('can cycle through all planes and back', () => {
      const mirror = new sceneMirror(audioCtx, 2);
      const planes = [0, 1, 2, 3, 0, 1, 2, 3] as const;

      for (const plane of planes) {
        mirror.mirror(plane);
        expect(mirror.mirrorPlane).toBe(plane);
      }
    });
  });
});
