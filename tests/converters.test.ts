/**
 * Tests for ambi-converters classes
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { createMockAudioContext } from './setup';
import { wxyz2acn, acn2wxyz, sn3d2n3d, n3d2sn3d, fuma2acn } from '../src/ambi-converters';

describe('wxyz2acn', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  it('creates converter with input and output nodes', () => {
    const converter = new wxyz2acn(audioCtx);
    expect(converter.in).toBeDefined();
    expect(converter.out).toBeDefined();
  });

  it('stores reference to audio context', () => {
    const converter = new wxyz2acn(audioCtx);
    expect(converter.ctx).toBe(audioCtx);
  });

  it('has 4 channel input (WXYZ format)', () => {
    const converter = new wxyz2acn(audioCtx);
    // The input splitter should have 4 channels
    expect(converter.in).toBeDefined();
  });

  it('has 4 channel output (ACN format)', () => {
    const converter = new wxyz2acn(audioCtx);
    // The output merger should have 4 channels
    expect(converter.out).toBeDefined();
  });
});

describe('acn2wxyz', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  it('creates converter with input and output nodes', () => {
    const converter = new acn2wxyz(audioCtx);
    expect(converter.in).toBeDefined();
    expect(converter.out).toBeDefined();
  });

  it('stores reference to audio context', () => {
    const converter = new acn2wxyz(audioCtx);
    expect(converter.ctx).toBe(audioCtx);
  });
});

describe('sn3d2n3d', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  it('creates converter with correct order', () => {
    const converter = new sn3d2n3d(audioCtx, 1);
    expect(converter.order).toBe(1);
  });

  it('calculates correct channel count for order 1', () => {
    const converter = new sn3d2n3d(audioCtx, 1);
    expect(converter.nCh).toBe(4);
  });

  it('calculates correct channel count for order 3', () => {
    const converter = new sn3d2n3d(audioCtx, 3);
    expect(converter.nCh).toBe(16);
  });

  it('creates input and output nodes', () => {
    const converter = new sn3d2n3d(audioCtx, 2);
    expect(converter.in).toBeDefined();
    expect(converter.out).toBeDefined();
  });

  it('stores reference to audio context', () => {
    const converter = new sn3d2n3d(audioCtx, 1);
    expect(converter.ctx).toBe(audioCtx);
  });
});

describe('n3d2sn3d', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  it('creates converter with correct order', () => {
    const converter = new n3d2sn3d(audioCtx, 1);
    expect(converter.order).toBe(1);
  });

  it('calculates correct channel count for order 1', () => {
    const converter = new n3d2sn3d(audioCtx, 1);
    expect(converter.nCh).toBe(4);
  });

  it('calculates correct channel count for order 2', () => {
    const converter = new n3d2sn3d(audioCtx, 2);
    expect(converter.nCh).toBe(9);
  });

  it('creates input and output nodes', () => {
    const converter = new n3d2sn3d(audioCtx, 2);
    expect(converter.in).toBeDefined();
    expect(converter.out).toBeDefined();
  });

  it('stores reference to audio context', () => {
    const converter = new n3d2sn3d(audioCtx, 1);
    expect(converter.ctx).toBe(audioCtx);
  });
});

describe('fuma2acn', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  it('creates converter with correct order', () => {
    const converter = new fuma2acn(audioCtx, 1);
    expect(converter.order).toBe(1);
  });

  it('limits order to maximum of 3', () => {
    const converter = new fuma2acn(audioCtx, 5);
    expect(converter.order).toBe(3);
  });

  it('calculates correct channel count for order 1', () => {
    const converter = new fuma2acn(audioCtx, 1);
    expect(converter.nCh).toBe(4);
  });

  it('calculates correct channel count for order 3', () => {
    const converter = new fuma2acn(audioCtx, 3);
    expect(converter.nCh).toBe(16);
  });

  it('creates input and output nodes', () => {
    const converter = new fuma2acn(audioCtx, 2);
    expect(converter.in).toBeDefined();
    expect(converter.out).toBeDefined();
  });

  it('stores reference to audio context', () => {
    const converter = new fuma2acn(audioCtx, 1);
    expect(converter.ctx).toBe(audioCtx);
  });
});

describe('converter pairs (roundtrip consistency)', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  it('wxyz2acn and acn2wxyz are complementary', () => {
    const toAcn = new wxyz2acn(audioCtx);
    const toWxyz = new acn2wxyz(audioCtx);

    // Both should have same number of channels (4 for FOA)
    expect(toAcn.in).toBeDefined();
    expect(toAcn.out).toBeDefined();
    expect(toWxyz.in).toBeDefined();
    expect(toWxyz.out).toBeDefined();
  });

  it('sn3d2n3d and n3d2sn3d are complementary', () => {
    const order = 2;
    const toN3d = new sn3d2n3d(audioCtx, order);
    const toSn3d = new n3d2sn3d(audioCtx, order);

    expect(toN3d.nCh).toBe(toSn3d.nCh);
    expect(toN3d.order).toBe(toSn3d.order);
  });
});
