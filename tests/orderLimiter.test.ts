/**
 * Tests for orderLimiter and orderLimiter2D classes
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { createMockAudioContext } from './setup';
import orderLimiter from '../src/ambi-orderLimiter';
import orderLimiter2D from '../src/ambi-orderLimiter2D';

describe('orderLimiter', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  describe('constructor', () => {
    it('creates a limiter with correct input order', () => {
      const limiter = new orderLimiter(audioCtx, 3, 1);
      expect(limiter.orderIn).toBe(3);
    });

    it('creates a limiter with correct output order', () => {
      const limiter = new orderLimiter(audioCtx, 3, 1);
      expect(limiter.orderOut).toBe(1);
    });

    it('limits output order to input order if higher', () => {
      const limiter = new orderLimiter(audioCtx, 2, 5);
      expect(limiter.orderOut).toBe(2);
    });

    it('calculates correct input channel count', () => {
      const limiter = new orderLimiter(audioCtx, 3, 1);
      expect(limiter.nChIn).toBe(16); // (3+1)^2
    });

    it('calculates correct output channel count', () => {
      const limiter = new orderLimiter(audioCtx, 3, 1);
      expect(limiter.nChOut).toBe(4); // (1+1)^2
    });

    it('stores reference to audio context', () => {
      const limiter = new orderLimiter(audioCtx, 3, 1);
      expect(limiter.ctx).toBe(audioCtx);
    });

    it('creates input and output nodes', () => {
      const limiter = new orderLimiter(audioCtx, 3, 1);
      expect(limiter.in).toBeDefined();
      expect(limiter.out).toBeDefined();
    });

    it('implements AmbisonicProcessor interface order getter', () => {
      const limiter = new orderLimiter(audioCtx, 3, 1);
      expect(limiter.order).toBe(1);
    });

    it('implements AmbisonicProcessor interface nCh getter', () => {
      const limiter = new orderLimiter(audioCtx, 3, 1);
      expect(limiter.nCh).toBe(4);
    });
  });

  describe('updateOrder', () => {
    it('can reduce output order', () => {
      const limiter = new orderLimiter(audioCtx, 3, 3);
      limiter.updateOrder(1);
      expect(limiter.orderOut).toBe(1);
      expect(limiter.nChOut).toBe(4);
    });

    it('ignores order higher than input order', () => {
      const limiter = new orderLimiter(audioCtx, 3, 1);
      limiter.updateOrder(5);
      expect(limiter.orderOut).toBe(1); // unchanged
    });

    it('can update to order 0', () => {
      const limiter = new orderLimiter(audioCtx, 3, 3);
      limiter.updateOrder(0);
      expect(limiter.orderOut).toBe(0);
      expect(limiter.nChOut).toBe(1);
    });

    it('can be called multiple times', () => {
      const limiter = new orderLimiter(audioCtx, 3, 3);
      limiter.updateOrder(2);
      expect(limiter.orderOut).toBe(2);
      limiter.updateOrder(1);
      expect(limiter.orderOut).toBe(1);
      limiter.updateOrder(0);
      expect(limiter.orderOut).toBe(0);
    });
  });
});

describe('orderLimiter2D', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  describe('constructor', () => {
    it('creates a limiter with correct input order', () => {
      const limiter = new orderLimiter2D(audioCtx, 3, 1);
      expect(limiter.orderIn).toBe(3);
    });

    it('creates a limiter with correct output order', () => {
      const limiter = new orderLimiter2D(audioCtx, 3, 1);
      expect(limiter.orderOut).toBe(1);
    });

    it('limits output order to input order if higher', () => {
      const limiter = new orderLimiter2D(audioCtx, 2, 5);
      expect(limiter.orderOut).toBe(2);
    });

    it('calculates correct 2D input channel count', () => {
      const limiter = new orderLimiter2D(audioCtx, 3, 1);
      expect(limiter.nChIn).toBe(7); // 2*3 + 1
    });

    it('calculates correct 2D output channel count', () => {
      const limiter = new orderLimiter2D(audioCtx, 3, 1);
      expect(limiter.nChOut).toBe(3); // 2*1 + 1
    });

    it('creates input and output nodes', () => {
      const limiter = new orderLimiter2D(audioCtx, 3, 1);
      expect(limiter.in).toBeDefined();
      expect(limiter.out).toBeDefined();
    });

    it('implements AmbisonicProcessor interface order getter', () => {
      const limiter = new orderLimiter2D(audioCtx, 3, 1);
      expect(limiter.order).toBe(1);
    });

    it('implements AmbisonicProcessor interface nCh getter', () => {
      const limiter = new orderLimiter2D(audioCtx, 3, 1);
      expect(limiter.nCh).toBe(3);
    });
  });

  describe('updateOrder', () => {
    it('can reduce output order', () => {
      const limiter = new orderLimiter2D(audioCtx, 3, 3);
      limiter.updateOrder(1);
      expect(limiter.orderOut).toBe(1);
      expect(limiter.nChOut).toBe(3);
    });

    it('ignores order higher than input order', () => {
      const limiter = new orderLimiter2D(audioCtx, 3, 1);
      limiter.updateOrder(5);
      expect(limiter.orderOut).toBe(1); // unchanged
    });

    it('can update to order 0', () => {
      const limiter = new orderLimiter2D(audioCtx, 3, 3);
      limiter.updateOrder(0);
      expect(limiter.orderOut).toBe(0);
      expect(limiter.nChOut).toBe(1);
    });
  });
});
