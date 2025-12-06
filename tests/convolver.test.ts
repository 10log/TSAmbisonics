/**
 * Tests for convolver class
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { createMockAudioContext, createMockAudioBuffer } from './setup';
import convolver from '../src/ambi-convolver';

describe('convolver', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  describe('constructor', () => {
    it('creates a convolver with correct order', () => {
      const conv = new convolver(audioCtx, 3);
      expect(conv.order).toBe(3);
    });

    it('calculates correct channel count', () => {
      const conv = new convolver(audioCtx, 3);
      expect(conv.nCh).toBe(16); // (3+1)^2
    });

    it('is marked as initialized', () => {
      const conv = new convolver(audioCtx, 3);
      expect(conv.initialized).toBe(true);
    });

    it('stores reference to audio context', () => {
      const conv = new convolver(audioCtx, 3);
      expect(conv.ctx).toBe(audioCtx);
    });

    it('creates input and output nodes', () => {
      const conv = new convolver(audioCtx, 3);
      expect(conv.in).toBeDefined();
      expect(conv.out).toBeDefined();
    });
  });

  describe('updateFilters', () => {
    it('does not throw when called with valid audio buffer', () => {
      const conv = new convolver(audioCtx, 1);
      const buffer = createMockAudioBuffer(4, 1024, 48000);
      expect(() => conv.updateFilters(buffer)).not.toThrow();
    });

    it('can be called multiple times', () => {
      const conv = new convolver(audioCtx, 1);
      const buffer1 = createMockAudioBuffer(4, 1024, 48000);
      const buffer2 = createMockAudioBuffer(4, 2048, 48000);

      conv.updateFilters(buffer1);
      expect(() => conv.updateFilters(buffer2)).not.toThrow();
    });
  });

  describe('different orders', () => {
    it('creates order 0 convolver with 1 channel', () => {
      const conv = new convolver(audioCtx, 0);
      expect(conv.nCh).toBe(1);
    });

    it('creates order 1 convolver with 4 channels', () => {
      const conv = new convolver(audioCtx, 1);
      expect(conv.nCh).toBe(4);
    });

    it('creates order 2 convolver with 9 channels', () => {
      const conv = new convolver(audioCtx, 2);
      expect(conv.nCh).toBe(9);
    });
  });
});
