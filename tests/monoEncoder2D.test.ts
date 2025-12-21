/**
 * Tests for monoEncoder2D class
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { createMockAudioContext } from './setup';
import monoEncoder2D from '../src/ambi-monoEncoder2D';

describe('monoEncoder2D', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  describe('constructor', () => {
    it('creates an encoder with correct order', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      expect(encoder.order).toBe(1);
    });

    it('calculates correct channel count for order 1 (2D)', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      expect(encoder.nCh).toBe(3); // 2*1 + 1 = 3
    });

    it('calculates correct channel count for order 3 (2D)', () => {
      const encoder = new monoEncoder2D(audioCtx, 3);
      expect(encoder.nCh).toBe(7); // 2*3 + 1 = 7
    });

    it('initializes with azimuth 0', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      expect(encoder.azim).toBe(0);
    });

    it('initializes with elevation 0', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      expect(encoder.elev).toBe(0);
    });

    it('is marked as initialized', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      expect(encoder.initialized).toBe(true);
    });

    it('stores reference to audio context', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      expect(encoder.ctx).toBe(audioCtx);
    });

    it('creates input and output nodes', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      expect(encoder.in).toBeDefined();
      expect(encoder.out).toBeDefined();
    });
  });

  describe('azimuth and elevation', () => {
    it('allows setting azimuth', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      encoder.azim = 90;
      expect(encoder.azim).toBe(90);
    });

    it('allows setting elevation (though 2D ignores it)', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      encoder.elev = 45;
      expect(encoder.elev).toBe(45);
    });

    it('allows negative azimuth values', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      encoder.azim = -90;
      expect(encoder.azim).toBe(-90);
    });
  });

  describe('updateGains', () => {
    it('does not throw when called', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      expect(() => encoder.updateGains()).not.toThrow();
    });

    it('can be called after changing azimuth', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      encoder.azim = 90;
      expect(() => encoder.updateGains()).not.toThrow();
    });

    it('can be called multiple times', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      encoder.azim = 0;
      encoder.updateGains();
      encoder.azim = 90;
      encoder.updateGains();
      encoder.azim = 180;
      expect(() => encoder.updateGains()).not.toThrow();
    });
  });

  describe('different orders', () => {
    it('creates order 0 encoder with 1 channel', () => {
      const encoder = new monoEncoder2D(audioCtx, 0);
      expect(encoder.nCh).toBe(1);
    });

    it('creates order 2 encoder with 5 channels', () => {
      const encoder = new monoEncoder2D(audioCtx, 2);
      expect(encoder.nCh).toBe(5);
    });

    it('creates order 4 encoder with 9 channels', () => {
      const encoder = new monoEncoder2D(audioCtx, 4);
      expect(encoder.nCh).toBe(9);
    });
  });

  describe('setDirection', () => {
    it('sets direction from Cartesian vector (front)', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      encoder.setDirection(1, 0, 0); // +X = front in ambisonics
      expect(encoder.azim).toBeCloseTo(0, 5);
      expect(encoder.elev).toBe(0); // Always 0 for 2D
    });

    it('sets direction from Cartesian vector (left)', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      encoder.setDirection(0, 1, 0); // +Y = left in ambisonics
      expect(encoder.azim).toBeCloseTo(90, 5);
    });

    it('ignores z component', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      encoder.setDirection(1, 0, 100); // z should be ignored
      expect(encoder.azim).toBeCloseTo(0, 5);
      expect(encoder.elev).toBe(0);
    });

    it('sets direction from Cartesian vector (right)', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      encoder.setDirection(0, -1, 0); // -Y = right in ambisonics
      expect(encoder.azim).toBeCloseTo(-90, 5);
    });

    it('converts Three.js coordinates (forward)', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      encoder.setDirection(0, 0, 1, 'threejs'); // +Z = forward in Three.js
      expect(encoder.azim).toBeCloseTo(0, 5);
    });

    it('converts Three.js coordinates (right)', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      encoder.setDirection(1, 0, 0, 'threejs'); // +X = right in Three.js
      expect(encoder.azim).toBeCloseTo(-90, 5);
    });
  });

  describe('getDirection', () => {
    it('returns unit vector for front direction', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      encoder.azim = 0;
      const [x, y, z] = encoder.getDirection();
      expect(x).toBeCloseTo(1, 5);
      expect(y).toBeCloseTo(0, 5);
      expect(z).toBe(0); // Always 0 for 2D
    });

    it('returns unit vector for left direction', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      encoder.azim = 90;
      const [x, y, z] = encoder.getDirection();
      expect(x).toBeCloseTo(0, 5);
      expect(y).toBeCloseTo(1, 5);
      expect(z).toBe(0);
    });

    it('converts to Three.js coordinates (front)', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      encoder.azim = 0;
      const [x, y, z] = encoder.getDirection('threejs');
      expect(x).toBeCloseTo(0, 5);
      expect(y).toBe(0); // Y always 0 in 2D
      expect(z).toBeCloseTo(1, 5); // Front in Three.js = +Z
    });

    it('converts to Three.js coordinates (left)', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      encoder.azim = 90;
      const [x, y, z] = encoder.getDirection('threejs');
      expect(x).toBeCloseTo(-1, 5); // Left in Three.js = -X
      expect(y).toBe(0);
      expect(z).toBeCloseTo(0, 5);
    });

    it('roundtrips through setDirection and getDirection', () => {
      const encoder = new monoEncoder2D(audioCtx, 1);
      encoder.setDirection(0.6, 0.8, 0);
      const [x, y, z] = encoder.getDirection();
      expect(x).toBeCloseTo(0.6, 5);
      expect(y).toBeCloseTo(0.8, 5);
      expect(z).toBe(0);
    });
  });
});
