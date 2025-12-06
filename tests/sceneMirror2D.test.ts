/**
 * Tests for sceneMirror2D class
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { createMockAudioContext } from './setup';
import sceneMirror2D from '../src/ambi-sceneMirror2D';

describe('sceneMirror2D', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  describe('constructor', () => {
    it('creates a mirror with correct order', () => {
      const mirror = new sceneMirror2D(audioCtx, 1);
      expect(mirror.order).toBe(1);
    });

    it('calculates correct channel count for order 1 (2D)', () => {
      const mirror = new sceneMirror2D(audioCtx, 1);
      expect(mirror.nCh).toBe(3);
    });

    it('calculates correct channel count for order 3 (2D)', () => {
      const mirror = new sceneMirror2D(audioCtx, 3);
      expect(mirror.nCh).toBe(7);
    });

    it('initializes mirrorPlane to 0 (no mirroring)', () => {
      const mirror = new sceneMirror2D(audioCtx, 1);
      expect(mirror.mirrorPlane).toBe(0);
    });

    it('stores reference to audio context', () => {
      const mirror = new sceneMirror2D(audioCtx, 1);
      expect(mirror.ctx).toBe(audioCtx);
    });

    it('creates input and output nodes', () => {
      const mirror = new sceneMirror2D(audioCtx, 1);
      expect(mirror.in).toBeDefined();
      expect(mirror.out).toBeDefined();
    });
  });

  describe('mirror method', () => {
    it('sets mirrorPlane to 0 for no mirroring', () => {
      const mirror = new sceneMirror2D(audioCtx, 1);
      mirror.mirror(0);
      expect(mirror.mirrorPlane).toBe(0);
    });

    it('sets mirrorPlane to 1 for front-back (yz-plane)', () => {
      const mirror = new sceneMirror2D(audioCtx, 1);
      mirror.mirror(1);
      expect(mirror.mirrorPlane).toBe(1);
    });

    it('sets mirrorPlane to 2 for left-right (xz-plane)', () => {
      const mirror = new sceneMirror2D(audioCtx, 1);
      mirror.mirror(2);
      expect(mirror.mirrorPlane).toBe(2);
    });

    it('handles plane 3 (up-down not applicable in 2D)', () => {
      const mirror = new sceneMirror2D(audioCtx, 1);
      // Should log a message but not throw
      expect(() => mirror.mirror(3)).not.toThrow();
    });

    it('does not throw for any valid plane', () => {
      const mirror = new sceneMirror2D(audioCtx, 1);
      expect(() => mirror.mirror(0)).not.toThrow();
      expect(() => mirror.mirror(1)).not.toThrow();
      expect(() => mirror.mirror(2)).not.toThrow();
    });

    it('can switch between mirror planes', () => {
      const mirror = new sceneMirror2D(audioCtx, 1);
      mirror.mirror(1);
      expect(mirror.mirrorPlane).toBe(1);
      mirror.mirror(2);
      expect(mirror.mirrorPlane).toBe(2);
      mirror.mirror(0);
      expect(mirror.mirrorPlane).toBe(0);
    });
  });

  describe('reset method', () => {
    it('does not throw when called', () => {
      const mirror = new sceneMirror2D(audioCtx, 1);
      expect(() => mirror.reset()).not.toThrow();
    });

    it('can be called after mirroring', () => {
      const mirror = new sceneMirror2D(audioCtx, 1);
      mirror.mirror(1);
      expect(() => mirror.reset()).not.toThrow();
    });
  });

  describe('different orders', () => {
    it('creates order 0 mirror with 1 channel', () => {
      const mirror = new sceneMirror2D(audioCtx, 0);
      expect(mirror.nCh).toBe(1);
    });

    it('creates order 2 mirror with 5 channels', () => {
      const mirror = new sceneMirror2D(audioCtx, 2);
      expect(mirror.nCh).toBe(5);
    });

    it('higher order mirror can apply all mirror planes', () => {
      const mirror = new sceneMirror2D(audioCtx, 3);
      expect(() => mirror.mirror(0)).not.toThrow();
      expect(() => mirror.mirror(1)).not.toThrow();
      expect(() => mirror.mirror(2)).not.toThrow();
    });
  });
});
