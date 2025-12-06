/**
 * Tests for analyser classes (rmsAnalyser, intensityAnalyser)
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { createMockAudioContext } from './setup';
import rmsAnalyser from '../src/ambi-rmsAnalyser';
import intensityAnalyser from '../src/ambi-intensityAnalyser';

describe('rmsAnalyser', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  describe('constructor', () => {
    it('creates an analyser with correct order', () => {
      const analyser = new rmsAnalyser(audioCtx, 1);
      expect(analyser.order).toBe(1);
    });

    it('calculates correct channel count', () => {
      const analyser = new rmsAnalyser(audioCtx, 1);
      expect(analyser.nCh).toBe(4);
    });

    it('has default fftSize of 2048', () => {
      const analyser = new rmsAnalyser(audioCtx, 1);
      expect(analyser.fftSize).toBe(2048);
    });

    it('stores reference to audio context', () => {
      const analyser = new rmsAnalyser(audioCtx, 1);
      expect(analyser.ctx).toBe(audioCtx);
    });

    it('creates input and output nodes', () => {
      const analyser = new rmsAnalyser(audioCtx, 1);
      expect(analyser.in).toBeDefined();
      expect(analyser.out).toBeDefined();
    });
  });

  describe('updateBuffers', () => {
    it('does not throw when called', () => {
      const analyser = new rmsAnalyser(audioCtx, 1);
      expect(() => analyser.updateBuffers()).not.toThrow();
    });

    it('can be called multiple times', () => {
      const analyser = new rmsAnalyser(audioCtx, 1);
      analyser.updateBuffers();
      analyser.updateBuffers();
      expect(() => analyser.updateBuffers()).not.toThrow();
    });
  });

  describe('computeRMS', () => {
    it('returns array with correct length', () => {
      const analyser = new rmsAnalyser(audioCtx, 1);
      analyser.updateBuffers();
      const rms = analyser.computeRMS();
      expect(rms.length).toBe(4);
    });

    it('returns non-negative values', () => {
      const analyser = new rmsAnalyser(audioCtx, 1);
      analyser.updateBuffers();
      const rms = analyser.computeRMS();
      for (const value of rms) {
        expect(value).toBeGreaterThanOrEqual(0);
      }
    });

    it('can be called multiple times', () => {
      const analyser = new rmsAnalyser(audioCtx, 1);
      analyser.updateBuffers();
      analyser.computeRMS();
      analyser.updateBuffers();
      expect(() => analyser.computeRMS()).not.toThrow();
    });
  });

  describe('different orders', () => {
    it('creates order 0 analyser with 1 channel', () => {
      const analyser = new rmsAnalyser(audioCtx, 0);
      expect(analyser.nCh).toBe(1);
    });

    it('creates order 2 analyser with 9 channels', () => {
      const analyser = new rmsAnalyser(audioCtx, 2);
      expect(analyser.nCh).toBe(9);
    });

    it('creates order 3 analyser with 16 channels', () => {
      const analyser = new rmsAnalyser(audioCtx, 3);
      expect(analyser.nCh).toBe(16);
    });
  });
});

describe('intensityAnalyser', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  describe('constructor', () => {
    it('creates an analyser', () => {
      const analyser = new intensityAnalyser(audioCtx);
      expect(analyser).toBeDefined();
    });

    it('has default fftSize of 2048', () => {
      const analyser = new intensityAnalyser(audioCtx);
      expect(analyser.fftSize).toBe(2048);
    });

    it('stores reference to audio context', () => {
      const analyser = new intensityAnalyser(audioCtx);
      expect(analyser.ctx).toBe(audioCtx);
    });

    it('creates input and output nodes', () => {
      const analyser = new intensityAnalyser(audioCtx);
      expect(analyser.in).toBeDefined();
      expect(analyser.out).toBeDefined();
    });
  });

  describe('updateBuffers', () => {
    it('does not throw when called', () => {
      const analyser = new intensityAnalyser(audioCtx);
      expect(() => analyser.updateBuffers()).not.toThrow();
    });

    it('can be called multiple times', () => {
      const analyser = new intensityAnalyser(audioCtx);
      analyser.updateBuffers();
      analyser.updateBuffers();
      expect(() => analyser.updateBuffers()).not.toThrow();
    });
  });

  describe('computeIntensity', () => {
    it('returns array with 4 elements [azim, elev, diffuseness, energy]', () => {
      const analyser = new intensityAnalyser(audioCtx);
      analyser.updateBuffers();
      const result = analyser.computeIntensity();
      expect(result.length).toBe(4);
    });

    it('returns numeric values', () => {
      const analyser = new intensityAnalyser(audioCtx);
      analyser.updateBuffers();
      const [azim, elev, diffuseness, energy] = analyser.computeIntensity();
      expect(typeof azim).toBe('number');
      expect(typeof elev).toBe('number');
      expect(typeof diffuseness).toBe('number');
      expect(typeof energy).toBe('number');
    });

    it('can be called multiple times', () => {
      const analyser = new intensityAnalyser(audioCtx);
      analyser.updateBuffers();
      analyser.computeIntensity();
      analyser.updateBuffers();
      expect(() => analyser.computeIntensity()).not.toThrow();
    });

    it('returns non-negative energy', () => {
      const analyser = new intensityAnalyser(audioCtx);
      analyser.updateBuffers();
      const [, , , energy] = analyser.computeIntensity();
      expect(energy).toBeGreaterThanOrEqual(0);
    });
  });
});
