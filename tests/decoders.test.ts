/**
 * Tests for decoder classes (binDecoder, decoder)
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { createMockAudioContext, createMockAudioBuffer } from './setup';
import binDecoder from '../src/ambi-binauralDecoder';
import decoder from '../src/ambi-decoder';

describe('binDecoder', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  describe('constructor', () => {
    it('creates a decoder with correct order', () => {
      const dec = new binDecoder(audioCtx, 1);
      expect(dec.order).toBe(1);
    });

    it('calculates correct channel count', () => {
      const dec = new binDecoder(audioCtx, 1);
      expect(dec.nCh).toBe(4);
    });

    it('is marked as initialized', () => {
      const dec = new binDecoder(audioCtx, 1);
      expect(dec.initialized).toBe(true);
    });

    it('stores reference to audio context', () => {
      const dec = new binDecoder(audioCtx, 1);
      expect(dec.ctx).toBe(audioCtx);
    });

    it('creates input and output nodes', () => {
      const dec = new binDecoder(audioCtx, 1);
      expect(dec.in).toBeDefined();
      expect(dec.out).toBeDefined();
    });
  });

  describe('resetFilters', () => {
    it('does not throw when called', () => {
      const dec = new binDecoder(audioCtx, 1);
      expect(() => dec.resetFilters()).not.toThrow();
    });

    it('can be called multiple times', () => {
      const dec = new binDecoder(audioCtx, 1);
      dec.resetFilters();
      dec.resetFilters();
      expect(() => dec.resetFilters()).not.toThrow();
    });
  });

  describe('updateFilters', () => {
    it('does not throw when called with valid audio buffer', () => {
      const dec = new binDecoder(audioCtx, 1);
      const buffer = createMockAudioBuffer(4, 1024, 48000);
      expect(() => dec.updateFilters(buffer)).not.toThrow();
    });

    it('can be called multiple times', () => {
      const dec = new binDecoder(audioCtx, 1);
      const buffer1 = createMockAudioBuffer(4, 1024, 48000);
      const buffer2 = createMockAudioBuffer(4, 2048, 48000);

      dec.updateFilters(buffer1);
      expect(() => dec.updateFilters(buffer2)).not.toThrow();
    });
  });

  describe('different orders', () => {
    it('creates order 1 decoder with 4 channels', () => {
      const dec = new binDecoder(audioCtx, 1);
      expect(dec.nCh).toBe(4);
    });

    it('creates order 2 decoder with 9 channels', () => {
      const dec = new binDecoder(audioCtx, 2);
      expect(dec.nCh).toBe(9);
    });

    it('creates order 3 decoder with 16 channels', () => {
      const dec = new binDecoder(audioCtx, 3);
      expect(dec.nCh).toBe(16);
    });
  });
});

describe('decoder', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  describe('constructor', () => {
    it('creates a decoder with correct order', () => {
      const dec = new decoder(audioCtx, 1);
      expect(dec.order).toBe(1);
    });

    it('calculates correct channel count', () => {
      const dec = new decoder(audioCtx, 1);
      expect(dec.nCh).toBe(4);
    });

    it('stores reference to audio context', () => {
      const dec = new decoder(audioCtx, 1);
      expect(dec.ctx).toBe(audioCtx);
    });

    it('creates input and output nodes', () => {
      const dec = new decoder(audioCtx, 1);
      expect(dec.in).toBeDefined();
      expect(dec.out).toBeDefined();
    });

    it('uses default speaker configuration for order 1', () => {
      const dec = new decoder(audioCtx, 1);
      expect(dec.nSpk).toBe(6); // octahedron
    });

    it('uses default speaker configuration for order 2', () => {
      const dec = new decoder(audioCtx, 2);
      expect(dec.nSpk).toBe(12); // icosahedron
    });

    it('uses default speaker configuration for order 3', () => {
      const dec = new decoder(audioCtx, 3);
      expect(dec.nSpk).toBe(20); // dodecahedron
    });
  });

  describe('speakerPos setter/getter', () => {
    it('can get speaker positions', () => {
      const dec = new decoder(audioCtx, 1);
      const pos = dec.speakerPos;
      expect(Array.isArray(pos)).toBe(true);
      expect(pos.length).toBeGreaterThan(0);
    });

    it('can set custom speaker positions', () => {
      const dec = new decoder(audioCtx, 1);
      const customPos: [number, number, number][] = [
        [0, 0, 1],
        [90, 0, 1],
        [180, 0, 1],
        [270, 0, 1],
      ];
      dec.speakerPos = customPos;
      expect(dec.nSpk).toBe(4);
    });

    it('updates nSpk when speaker positions change', () => {
      const dec = new decoder(audioCtx, 1);
      const initialNSpk = dec.nSpk;

      const newPos: [number, number, number][] = [
        [0, 0, 1],
        [120, 0, 1],
        [240, 0, 1],
      ];
      dec.speakerPos = newPos;

      expect(dec.nSpk).toBe(3);
      expect(dec.nSpk).not.toBe(initialNSpk);
    });

    it('returns to default when set to undefined', () => {
      const dec = new decoder(audioCtx, 1);
      dec.speakerPos = undefined;
      expect(dec.nSpk).toBe(6); // default for order 1
    });
  });

  describe('speaker configurations', () => {
    it('each speaker position has 3 elements [azim, elev, dist]', () => {
      const dec = new decoder(audioCtx, 1);
      const pos = dec.speakerPos;

      for (const speaker of pos) {
        expect(speaker.length).toBe(3);
        expect(typeof speaker[0]).toBe('number'); // azimuth
        expect(typeof speaker[1]).toBe('number'); // elevation
        expect(typeof speaker[2]).toBe('number'); // distance
      }
    });

    it('can handle stereo configuration', () => {
      const dec = new decoder(audioCtx, 1);
      const stereo: [number, number, number][] = [
        [-30, 0, 1],
        [30, 0, 1],
      ];
      dec.speakerPos = stereo;
      expect(dec.nSpk).toBe(2);
    });

    it('can handle 5.1 surround configuration', () => {
      const dec = new decoder(audioCtx, 1);
      const surround51: [number, number, number][] = [
        [0, 0, 1], // center
        [-30, 0, 1], // left
        [30, 0, 1], // right
        [-110, 0, 1], // left surround
        [110, 0, 1], // right surround
      ];
      dec.speakerPos = surround51;
      expect(dec.nSpk).toBe(5);
    });
  });

  describe('different orders', () => {
    it('creates order 1 decoder with 4 channels', () => {
      const dec = new decoder(audioCtx, 1);
      expect(dec.nCh).toBe(4);
    });

    it('creates order 2 decoder with 9 channels', () => {
      const dec = new decoder(audioCtx, 2);
      expect(dec.nCh).toBe(9);
    });

    it('creates order 3 decoder with 16 channels', () => {
      const dec = new decoder(audioCtx, 3);
      expect(dec.nCh).toBe(16);
    });
  });
});
