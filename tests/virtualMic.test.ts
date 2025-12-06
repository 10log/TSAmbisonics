/**
 * Tests for virtualMic class
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { createMockAudioContext } from './setup';
import virtualMic from '../src/ambi-virtualMic';

describe('virtualMic', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  describe('constructor', () => {
    it('creates a virtual mic with correct order', () => {
      const vmic = new virtualMic(audioCtx, 3);
      expect(vmic.order).toBe(3);
    });

    it('calculates correct channel count', () => {
      const vmic = new virtualMic(audioCtx, 3);
      expect(vmic.nCh).toBe(16); // (3+1)^2
    });

    it('initializes azimuth to 0', () => {
      const vmic = new virtualMic(audioCtx, 3);
      expect(vmic.azim).toBe(0);
    });

    it('initializes elevation to 0', () => {
      const vmic = new virtualMic(audioCtx, 3);
      expect(vmic.elev).toBe(0);
    });

    it('initializes pattern to hypercardioid', () => {
      const vmic = new virtualMic(audioCtx, 3);
      expect(vmic.vmicPattern).toBe('hypercardioid');
    });

    it('is marked as initialized', () => {
      const vmic = new virtualMic(audioCtx, 3);
      expect(vmic.initialized).toBe(true);
    });

    it('stores reference to audio context', () => {
      const vmic = new virtualMic(audioCtx, 3);
      expect(vmic.ctx).toBe(audioCtx);
    });

    it('creates input and output nodes', () => {
      const vmic = new virtualMic(audioCtx, 3);
      expect(vmic.in).toBeDefined();
      expect(vmic.out).toBeDefined();
    });
  });

  describe('orientation', () => {
    it('allows setting azimuth', () => {
      const vmic = new virtualMic(audioCtx, 3);
      vmic.azim = 90;
      expect(vmic.azim).toBe(90);
    });

    it('allows setting elevation', () => {
      const vmic = new virtualMic(audioCtx, 3);
      vmic.elev = 45;
      expect(vmic.elev).toBe(45);
    });

    it('allows negative values', () => {
      const vmic = new virtualMic(audioCtx, 3);
      vmic.azim = -90;
      vmic.elev = -45;
      expect(vmic.azim).toBe(-90);
      expect(vmic.elev).toBe(-45);
    });
  });

  describe('updateOrientation', () => {
    it('does not throw when called', () => {
      const vmic = new virtualMic(audioCtx, 3);
      expect(() => vmic.updateOrientation()).not.toThrow();
    });

    it('can be called after changing azimuth', () => {
      const vmic = new virtualMic(audioCtx, 3);
      vmic.azim = 90;
      expect(() => vmic.updateOrientation()).not.toThrow();
    });

    it('can be called after changing elevation', () => {
      const vmic = new virtualMic(audioCtx, 3);
      vmic.elev = 45;
      expect(() => vmic.updateOrientation()).not.toThrow();
    });
  });

  describe('patterns', () => {
    it('allows setting cardioid pattern', () => {
      const vmic = new virtualMic(audioCtx, 3);
      vmic.vmicPattern = 'cardioid';
      expect(vmic.vmicPattern).toBe('cardioid');
    });

    it('allows setting supercardioid pattern', () => {
      const vmic = new virtualMic(audioCtx, 3);
      vmic.vmicPattern = 'supercardioid';
      expect(vmic.vmicPattern).toBe('supercardioid');
    });

    it('allows setting hypercardioid pattern', () => {
      const vmic = new virtualMic(audioCtx, 3);
      vmic.vmicPattern = 'hypercardioid';
      expect(vmic.vmicPattern).toBe('hypercardioid');
    });

    it('allows setting max_rE pattern', () => {
      const vmic = new virtualMic(audioCtx, 3);
      vmic.vmicPattern = 'max_rE';
      expect(vmic.vmicPattern).toBe('max_rE');
    });
  });

  describe('updatePattern', () => {
    it('does not throw for cardioid pattern', () => {
      const vmic = new virtualMic(audioCtx, 3);
      vmic.vmicPattern = 'cardioid';
      expect(() => vmic.updatePattern()).not.toThrow();
    });

    it('does not throw for supercardioid pattern', () => {
      const vmic = new virtualMic(audioCtx, 3);
      vmic.vmicPattern = 'supercardioid';
      expect(() => vmic.updatePattern()).not.toThrow();
    });

    it('does not throw for hypercardioid pattern', () => {
      const vmic = new virtualMic(audioCtx, 3);
      vmic.vmicPattern = 'hypercardioid';
      expect(() => vmic.updatePattern()).not.toThrow();
    });

    it('does not throw for max_rE pattern', () => {
      const vmic = new virtualMic(audioCtx, 3);
      vmic.vmicPattern = 'max_rE';
      expect(() => vmic.updatePattern()).not.toThrow();
    });

    it('can cycle through all patterns', () => {
      const vmic = new virtualMic(audioCtx, 3);
      const patterns = ['cardioid', 'supercardioid', 'hypercardioid', 'max_rE'] as const;

      for (const pattern of patterns) {
        vmic.vmicPattern = pattern;
        expect(() => vmic.updatePattern()).not.toThrow();
      }
    });
  });

  describe('different orders', () => {
    it('creates order 1 virtual mic', () => {
      const vmic = new virtualMic(audioCtx, 1);
      expect(vmic.nCh).toBe(4);
    });

    it('creates order 2 virtual mic', () => {
      const vmic = new virtualMic(audioCtx, 2);
      expect(vmic.nCh).toBe(9);
    });

    it('creates order 4 virtual mic', () => {
      const vmic = new virtualMic(audioCtx, 4);
      expect(vmic.nCh).toBe(25);
    });

    it('supercardioid works for orders 1-4', () => {
      for (const order of [1, 2, 3, 4]) {
        const vmic = new virtualMic(audioCtx, order);
        vmic.vmicPattern = 'supercardioid';
        expect(() => vmic.updatePattern()).not.toThrow();
      }
    });
  });
});
