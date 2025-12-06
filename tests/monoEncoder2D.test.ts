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
});
