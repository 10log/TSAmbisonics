/**
 * Tests for monoEncoder class
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { createMockAudioContext } from './setup';
import monoEncoder from '../src/ambi-monoEncoder';

describe('monoEncoder', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  describe('constructor', () => {
    it('creates an encoder with correct order', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      expect(encoder.order).toBe(1);
    });

    it('calculates correct channel count for order 1', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      expect(encoder.nCh).toBe(4); // (1+1)^2 = 4
    });

    it('calculates correct channel count for order 3', () => {
      const encoder = new monoEncoder(audioCtx, 3);
      expect(encoder.nCh).toBe(16); // (3+1)^2 = 16
    });

    it('initializes with azimuth 0', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      expect(encoder.azim).toBe(0);
    });

    it('initializes with elevation 0', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      expect(encoder.elev).toBe(0);
    });

    it('is marked as initialized', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      expect(encoder.initialized).toBe(true);
    });

    it('stores reference to audio context', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      expect(encoder.ctx).toBe(audioCtx);
    });

    it('creates input and output nodes', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      expect(encoder.in).toBeDefined();
      expect(encoder.out).toBeDefined();
    });
  });

  describe('azimuth and elevation', () => {
    it('allows setting azimuth', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.azim = 90;
      expect(encoder.azim).toBe(90);
    });

    it('allows setting elevation', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.elev = 45;
      expect(encoder.elev).toBe(45);
    });

    it('allows negative azimuth values', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.azim = -90;
      expect(encoder.azim).toBe(-90);
    });

    it('allows negative elevation values', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.elev = -45;
      expect(encoder.elev).toBe(-45);
    });
  });

  describe('updateGains', () => {
    it('does not throw when called', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      expect(() => encoder.updateGains()).not.toThrow();
    });

    it('can be called after changing azimuth', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.azim = 90;
      expect(() => encoder.updateGains()).not.toThrow();
    });

    it('can be called after changing elevation', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.elev = 45;
      expect(() => encoder.updateGains()).not.toThrow();
    });

    it('can be called multiple times', () => {
      const encoder = new monoEncoder(audioCtx, 1);
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
      const encoder = new monoEncoder(audioCtx, 0);
      expect(encoder.nCh).toBe(1);
    });

    it('creates order 2 encoder with 9 channels', () => {
      const encoder = new monoEncoder(audioCtx, 2);
      expect(encoder.nCh).toBe(9);
    });

    it('creates order 4 encoder with 25 channels', () => {
      const encoder = new monoEncoder(audioCtx, 4);
      expect(encoder.nCh).toBe(25);
    });
  });

  describe('setDirection', () => {
    it('sets direction from Cartesian vector (front)', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.setDirection(1, 0, 0); // +X = front in ambisonics
      expect(encoder.azim).toBeCloseTo(0, 5);
      expect(encoder.elev).toBeCloseTo(0, 5);
    });

    it('sets direction from Cartesian vector (left)', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.setDirection(0, 1, 0); // +Y = left in ambisonics
      expect(encoder.azim).toBeCloseTo(90, 5);
      expect(encoder.elev).toBeCloseTo(0, 5);
    });

    it('sets direction from Cartesian vector (up)', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.setDirection(0, 0, 1); // +Z = up in ambisonics
      expect(encoder.elev).toBeCloseTo(90, 5);
    });

    it('sets direction from Cartesian vector (right)', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.setDirection(0, -1, 0); // -Y = right in ambisonics
      expect(encoder.azim).toBeCloseTo(-90, 5);
      expect(encoder.elev).toBeCloseTo(0, 5);
    });

    it('handles non-normalized vectors', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.setDirection(10, 0, 0); // Non-unit vector
      expect(encoder.azim).toBeCloseTo(0, 5);
      expect(encoder.elev).toBeCloseTo(0, 5);
    });

    it('converts Three.js coordinates (forward)', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.setDirection(0, 0, 1, 'threejs'); // +Z = forward in Three.js
      expect(encoder.azim).toBeCloseTo(0, 5);
      expect(encoder.elev).toBeCloseTo(0, 5);
    });

    it('converts Three.js coordinates (right)', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.setDirection(1, 0, 0, 'threejs'); // +X = right in Three.js
      expect(encoder.azim).toBeCloseTo(-90, 5);
      expect(encoder.elev).toBeCloseTo(0, 5);
    });

    it('converts Three.js coordinates (up)', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.setDirection(0, 1, 0, 'threejs'); // +Y = up in Three.js
      expect(encoder.elev).toBeCloseTo(90, 5);
    });

    it('sets direction from Cartesian vector (down)', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.setDirection(0, 0, -1); // -Z = down in ambisonics
      expect(encoder.elev).toBeCloseTo(-90, 5);
    });

    it('sets direction from Cartesian vector (back)', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.setDirection(-1, 0, 0); // -X = back in ambisonics
      expect(Math.abs(encoder.azim)).toBeCloseTo(180, 5);
      expect(encoder.elev).toBeCloseTo(0, 5);
    });

    it('handles zero vector gracefully', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      // Zero vector is degenerate - just verify it doesn't throw
      expect(() => encoder.setDirection(0, 0, 0)).not.toThrow();
    });
  });

  describe('getDirection', () => {
    it('returns unit vector for front direction', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.azim = 0;
      encoder.elev = 0;
      const [x, y, z] = encoder.getDirection();
      expect(x).toBeCloseTo(1, 5);
      expect(y).toBeCloseTo(0, 5);
      expect(z).toBeCloseTo(0, 5);
    });

    it('returns unit vector for left direction', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.azim = 90;
      encoder.elev = 0;
      const [x, y, z] = encoder.getDirection();
      expect(x).toBeCloseTo(0, 5);
      expect(y).toBeCloseTo(1, 5);
      expect(z).toBeCloseTo(0, 5);
    });

    it('returns unit vector for up direction', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.azim = 0;
      encoder.elev = 90;
      const [x, y, z] = encoder.getDirection();
      expect(x).toBeCloseTo(0, 5);
      expect(y).toBeCloseTo(0, 5);
      expect(z).toBeCloseTo(1, 5);
    });

    it('converts to Three.js coordinates (front)', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.azim = 0;
      encoder.elev = 0;
      const [x, y, z] = encoder.getDirection('threejs');
      expect(x).toBeCloseTo(0, 5);
      expect(y).toBeCloseTo(0, 5);
      expect(z).toBeCloseTo(1, 5); // Front in Three.js = +Z
    });

    it('converts to Three.js coordinates (left)', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.azim = 90;
      encoder.elev = 0;
      const [x, y, z] = encoder.getDirection('threejs');
      expect(x).toBeCloseTo(-1, 5); // Left in Three.js = -X
      expect(y).toBeCloseTo(0, 5);
      expect(z).toBeCloseTo(0, 5);
    });

    it('converts to Three.js coordinates (up)', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      encoder.azim = 0;
      encoder.elev = 90;
      const [x, y, z] = encoder.getDirection('threejs');
      expect(x).toBeCloseTo(0, 5);
      expect(y).toBeCloseTo(1, 5); // Up in Three.js = +Y
      expect(z).toBeCloseTo(0, 5);
    });

    it('roundtrips through setDirection and getDirection', () => {
      const encoder = new monoEncoder(audioCtx, 1);
      // Use a normalized vector: [1/sqrt(3), 1/sqrt(3), 1/sqrt(3)]
      const s = 1 / Math.sqrt(3);
      const original = [s, s, s] as [number, number, number];
      encoder.setDirection(...original);
      const result = encoder.getDirection();
      expect(result[0]).toBeCloseTo(original[0], 5);
      expect(result[1]).toBeCloseTo(original[1], 5);
      expect(result[2]).toBeCloseTo(original[2], 5);
    });
  });
});
