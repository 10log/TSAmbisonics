/**
 * Tests for orderWeight class
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { createMockAudioContext } from './setup';
import orderWeight from '../src/ambi-orderWeight';

describe('orderWeight', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  describe('constructor', () => {
    it('creates a weight processor with correct order', () => {
      const weight = new orderWeight(audioCtx, 3);
      expect(weight.order).toBe(3);
    });

    it('calculates correct channel count', () => {
      const weight = new orderWeight(audioCtx, 3);
      expect(weight.nCh).toBe(16); // (3+1)^2
    });

    it('initializes orderGains array with correct length', () => {
      const weight = new orderWeight(audioCtx, 3);
      expect(weight.orderGains.length).toBe(4); // order + 1
    });

    it('initializes all orderGains to 1', () => {
      const weight = new orderWeight(audioCtx, 3);
      for (let i = 0; i <= 3; i++) {
        expect(weight.orderGains[i]).toBe(1);
      }
    });

    it('stores reference to audio context', () => {
      const weight = new orderWeight(audioCtx, 3);
      expect(weight.ctx).toBe(audioCtx);
    });

    it('creates input and output nodes', () => {
      const weight = new orderWeight(audioCtx, 3);
      expect(weight.in).toBeDefined();
      expect(weight.out).toBeDefined();
    });
  });

  describe('updateOrderGains', () => {
    it('does not throw when called', () => {
      const weight = new orderWeight(audioCtx, 3);
      expect(() => weight.updateOrderGains()).not.toThrow();
    });

    it('can be called after modifying orderGains', () => {
      const weight = new orderWeight(audioCtx, 3);
      weight.orderGains[0] = 0.5;
      weight.orderGains[1] = 0.3;
      expect(() => weight.updateOrderGains()).not.toThrow();
    });

    it('can be called multiple times', () => {
      const weight = new orderWeight(audioCtx, 3);
      weight.updateOrderGains();
      weight.orderGains[2] = 0.7;
      weight.updateOrderGains();
      expect(() => weight.updateOrderGains()).not.toThrow();
    });
  });

  describe('computeMaxRECoeffs', () => {
    it('does not throw when called', () => {
      const weight = new orderWeight(audioCtx, 3);
      expect(() => weight.computeMaxRECoeffs()).not.toThrow();
    });

    it('sets orderGains[0] to 1', () => {
      const weight = new orderWeight(audioCtx, 3);
      weight.computeMaxRECoeffs();
      expect(weight.orderGains[0]).toBe(1);
    });

    it('sets subsequent orderGains to values less than 1', () => {
      const weight = new orderWeight(audioCtx, 3);
      weight.computeMaxRECoeffs();
      for (let i = 1; i <= 3; i++) {
        expect(weight.orderGains[i]).toBeLessThan(1);
      }
    });

    it('produces decreasing gains for higher orders', () => {
      const weight = new orderWeight(audioCtx, 3);
      weight.computeMaxRECoeffs();
      // Higher orders should generally have lower gains
      expect(weight.orderGains[1]).toBeLessThan(weight.orderGains[0]);
    });

    it('works for different orders', () => {
      for (const order of [1, 2, 3, 4]) {
        const weight = new orderWeight(audioCtx, order);
        expect(() => weight.computeMaxRECoeffs()).not.toThrow();
        expect(weight.orderGains[0]).toBe(1);
      }
    });
  });

  describe('different orders', () => {
    it('creates order 0 weight with 1 channel', () => {
      const weight = new orderWeight(audioCtx, 0);
      expect(weight.nCh).toBe(1);
      expect(weight.orderGains.length).toBe(1);
    });

    it('creates order 1 weight with 4 channels', () => {
      const weight = new orderWeight(audioCtx, 1);
      expect(weight.nCh).toBe(4);
      expect(weight.orderGains.length).toBe(2);
    });

    it('creates order 2 weight with 9 channels', () => {
      const weight = new orderWeight(audioCtx, 2);
      expect(weight.nCh).toBe(9);
      expect(weight.orderGains.length).toBe(3);
    });
  });
});
