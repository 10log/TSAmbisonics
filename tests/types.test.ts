/**
 * Tests for types.ts utility functions
 */
import { describe, it, expect } from 'vitest';
import {
  getAmbisonicChannelCount,
  getAmbisonicChannelCount2D,
  degreesToRadians,
  radiansToDegrees,
} from '../src/types';

describe('getAmbisonicChannelCount', () => {
  it('returns 1 channel for order 0', () => {
    expect(getAmbisonicChannelCount(0)).toBe(1);
  });

  it('returns 4 channels for order 1 (FOA)', () => {
    expect(getAmbisonicChannelCount(1)).toBe(4);
  });

  it('returns 9 channels for order 2', () => {
    expect(getAmbisonicChannelCount(2)).toBe(9);
  });

  it('returns 16 channels for order 3', () => {
    expect(getAmbisonicChannelCount(3)).toBe(16);
  });

  it('returns 25 channels for order 4', () => {
    expect(getAmbisonicChannelCount(4)).toBe(25);
  });

  it('follows (order + 1)^2 formula', () => {
    for (let order = 0; order <= 7; order++) {
      expect(getAmbisonicChannelCount(order)).toBe((order + 1) * (order + 1));
    }
  });
});

describe('getAmbisonicChannelCount2D', () => {
  it('returns 1 channel for order 0', () => {
    expect(getAmbisonicChannelCount2D(0)).toBe(1);
  });

  it('returns 3 channels for order 1 (FOA 2D)', () => {
    expect(getAmbisonicChannelCount2D(1)).toBe(3);
  });

  it('returns 5 channels for order 2', () => {
    expect(getAmbisonicChannelCount2D(2)).toBe(5);
  });

  it('returns 7 channels for order 3', () => {
    expect(getAmbisonicChannelCount2D(3)).toBe(7);
  });

  it('follows 2*order + 1 formula', () => {
    for (let order = 0; order <= 7; order++) {
      expect(getAmbisonicChannelCount2D(order)).toBe(2 * order + 1);
    }
  });
});

describe('degreesToRadians', () => {
  it('converts 0 degrees to 0 radians', () => {
    expect(degreesToRadians(0)).toBe(0);
  });

  it('converts 90 degrees to PI/2 radians', () => {
    expect(degreesToRadians(90)).toBeCloseTo(Math.PI / 2);
  });

  it('converts 180 degrees to PI radians', () => {
    expect(degreesToRadians(180)).toBeCloseTo(Math.PI);
  });

  it('converts 360 degrees to 2*PI radians', () => {
    expect(degreesToRadians(360)).toBeCloseTo(2 * Math.PI);
  });

  it('converts negative degrees correctly', () => {
    expect(degreesToRadians(-90)).toBeCloseTo(-Math.PI / 2);
  });

  it('converts 45 degrees to PI/4 radians', () => {
    expect(degreesToRadians(45)).toBeCloseTo(Math.PI / 4);
  });
});

describe('radiansToDegrees', () => {
  it('converts 0 radians to 0 degrees', () => {
    expect(radiansToDegrees(0)).toBe(0);
  });

  it('converts PI/2 radians to 90 degrees', () => {
    expect(radiansToDegrees(Math.PI / 2)).toBeCloseTo(90);
  });

  it('converts PI radians to 180 degrees', () => {
    expect(radiansToDegrees(Math.PI)).toBeCloseTo(180);
  });

  it('converts 2*PI radians to 360 degrees', () => {
    expect(radiansToDegrees(2 * Math.PI)).toBeCloseTo(360);
  });

  it('converts negative radians correctly', () => {
    expect(radiansToDegrees(-Math.PI / 2)).toBeCloseTo(-90);
  });

  it('is inverse of degreesToRadians', () => {
    for (const deg of [0, 30, 45, 60, 90, 120, 180, 270, 360]) {
      expect(radiansToDegrees(degreesToRadians(deg))).toBeCloseTo(deg);
    }
  });
});
