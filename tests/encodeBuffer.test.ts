/**
 * Tests for buffer-based ambisonic encoding utilities
 */
import { describe, it, expect } from 'vitest';
import {
  encodeBuffer,
  encodeBuffer2D,
  encodeBufferFromDirection,
  encodeBuffer2DFromDirection,
  encodeAndSumBuffers,
  computeEncodingCoefficients,
  computeEncodingCoefficients2D,
} from '../src/ambi-encodeBuffer';

describe('computeEncodingCoefficients', () => {
  it('returns correct number of coefficients for order 1', () => {
    const coeffs = computeEncodingCoefficients(0, 0, 1);
    expect(coeffs.length).toBe(4); // (1+1)^2 = 4
  });

  it('returns correct number of coefficients for order 2', () => {
    const coeffs = computeEncodingCoefficients(0, 0, 2);
    expect(coeffs.length).toBe(9); // (2+1)^2 = 9
  });

  it('returns correct number of coefficients for order 3', () => {
    const coeffs = computeEncodingCoefficients(0, 0, 3);
    expect(coeffs.length).toBe(16); // (3+1)^2 = 16
  });

  it('returns Float32Array', () => {
    const coeffs = computeEncodingCoefficients(0, 0, 1);
    expect(coeffs).toBeInstanceOf(Float32Array);
  });

  it('W channel (ACN 0) is always positive for any direction', () => {
    // W channel should be 1/sqrt(4pi) ≈ 0.282 for N3D normalization
    const coeffs1 = computeEncodingCoefficients(0, 0, 1);
    const coeffs2 = computeEncodingCoefficients(90, 45, 1);
    const coeffs3 = computeEncodingCoefficients(-135, -30, 1);

    expect(coeffs1[0]).toBeGreaterThan(0);
    expect(coeffs2[0]).toBeGreaterThan(0);
    expect(coeffs3[0]).toBeGreaterThan(0);

    // All W values should be equal (omnidirectional)
    expect(coeffs1[0]).toBeCloseTo(coeffs2[0], 5);
    expect(coeffs1[0]).toBeCloseTo(coeffs3[0], 5);
  });
});

describe('computeEncodingCoefficients2D', () => {
  it('returns correct number of coefficients for order 1', () => {
    const coeffs = computeEncodingCoefficients2D(0, 1);
    expect(coeffs.length).toBe(3); // 2*1 + 1 = 3
  });

  it('returns correct number of coefficients for order 3', () => {
    const coeffs = computeEncodingCoefficients2D(0, 3);
    expect(coeffs.length).toBe(7); // 2*3 + 1 = 7
  });

  it('returns Float32Array', () => {
    const coeffs = computeEncodingCoefficients2D(0, 1);
    expect(coeffs).toBeInstanceOf(Float32Array);
  });
});

describe('encodeBuffer', () => {
  it('returns correct number of channels for order 1', () => {
    const mono = new Float32Array([1, 0, -1, 0]);
    const result = encodeBuffer(mono, 0, 0, 1);
    expect(result.length).toBe(4);
  });

  it('returns correct number of channels for order 2', () => {
    const mono = new Float32Array([1, 0, -1, 0]);
    const result = encodeBuffer(mono, 0, 0, 2);
    expect(result.length).toBe(9);
  });

  it('preserves sample count in each channel', () => {
    const mono = new Float32Array([1, 2, 3, 4, 5]);
    const result = encodeBuffer(mono, 45, 30, 1);

    for (const channel of result) {
      expect(channel.length).toBe(5);
    }
  });

  it('returns Float32Arrays', () => {
    const mono = new Float32Array([1, 0, -1]);
    const result = encodeBuffer(mono, 0, 0, 1);

    for (const channel of result) {
      expect(channel).toBeInstanceOf(Float32Array);
    }
  });

  it('encodes front direction correctly (azim=0, elev=0)', () => {
    const mono = new Float32Array([1]);
    const result = encodeBuffer(mono, 0, 0, 1);

    // For front direction: W positive, Y≈0, Z≈0, X positive
    expect(result[0][0]).toBeGreaterThan(0); // W
    expect(result[1][0]).toBeCloseTo(0, 5); // Y
    expect(result[2][0]).toBeCloseTo(0, 5); // Z
    expect(result[3][0]).toBeGreaterThan(0); // X
  });

  it('encodes left direction correctly (azim=90, elev=0)', () => {
    const mono = new Float32Array([1]);
    const result = encodeBuffer(mono, 90, 0, 1);

    // For left direction: W positive, Y positive, Z≈0, X≈0
    expect(result[0][0]).toBeGreaterThan(0); // W
    expect(result[1][0]).toBeGreaterThan(0); // Y
    expect(result[2][0]).toBeCloseTo(0, 5); // Z
    expect(result[3][0]).toBeCloseTo(0, 5); // X
  });

  it('encodes up direction correctly (azim=0, elev=90)', () => {
    const mono = new Float32Array([1]);
    const result = encodeBuffer(mono, 0, 90, 1);

    // For up direction: W positive, Y≈0, Z positive, X≈0
    expect(result[0][0]).toBeGreaterThan(0); // W
    expect(result[1][0]).toBeCloseTo(0, 5); // Y
    expect(result[2][0]).toBeGreaterThan(0); // Z
    expect(result[3][0]).toBeCloseTo(0, 5); // X
  });

  it('scales output linearly with input amplitude', () => {
    const mono1 = new Float32Array([1]);
    const mono2 = new Float32Array([2]);

    const result1 = encodeBuffer(mono1, 45, 0, 1);
    const result2 = encodeBuffer(mono2, 45, 0, 1);

    for (let ch = 0; ch < 4; ch++) {
      expect(result2[ch][0]).toBeCloseTo(result1[ch][0] * 2, 5);
    }
  });

  it('handles empty input', () => {
    const mono = new Float32Array(0);
    const result = encodeBuffer(mono, 0, 0, 1);

    expect(result.length).toBe(4);
    for (const channel of result) {
      expect(channel.length).toBe(0);
    }
  });
});

describe('encodeBuffer2D', () => {
  it('returns correct number of channels for order 1', () => {
    const mono = new Float32Array([1, 0, -1, 0]);
    const result = encodeBuffer2D(mono, 0, 1);
    expect(result.length).toBe(3);
  });

  it('returns correct number of channels for order 3', () => {
    const mono = new Float32Array([1, 0, -1, 0]);
    const result = encodeBuffer2D(mono, 0, 3);
    expect(result.length).toBe(7);
  });

  it('preserves sample count in each channel', () => {
    const mono = new Float32Array([1, 2, 3, 4, 5]);
    const result = encodeBuffer2D(mono, 45, 1);

    for (const channel of result) {
      expect(channel.length).toBe(5);
    }
  });

  it('encodes front direction correctly (azim=0)', () => {
    const mono = new Float32Array([1]);
    const result = encodeBuffer2D(mono, 0, 1);

    // 2D circular harmonics channel ordering:
    // Ch 0: W (omnidirectional)
    // Ch 1: sin(-m*phi) for m=1 -> sin(-phi)
    // Ch 2: cos(m*phi) for m=1 -> cos(phi)
    // For front (azim=0): W positive, sin(0)=0, cos(0)=1
    expect(result[0][0]).toBeGreaterThan(0); // W
    expect(result[1][0]).toBeCloseTo(0, 5); // sin(-0) = 0
    expect(result[2][0]).toBeGreaterThan(0); // cos(0) = 1
  });

  it('encodes left direction correctly (azim=90)', () => {
    const mono = new Float32Array([1]);
    const result = encodeBuffer2D(mono, 90, 1);

    // For left (azim=90°): W positive, sin(-90°) = -1, cos(90°) = 0
    expect(result[0][0]).toBeGreaterThan(0); // W
    expect(result[1][0]).toBeLessThan(0); // sin(-90°) < 0
    expect(result[2][0]).toBeCloseTo(0, 5); // cos(90°) ≈ 0
  });
});

describe('encodeBufferFromDirection', () => {
  it('encodes front direction using Cartesian vector', () => {
    const mono = new Float32Array([1]);
    const result = encodeBufferFromDirection(mono, 1, 0, 0, 1); // +X = front

    // Should match encodeBuffer(mono, 0, 0, 1)
    const expected = encodeBuffer(mono, 0, 0, 1);

    for (let ch = 0; ch < 4; ch++) {
      expect(result[ch][0]).toBeCloseTo(expected[ch][0], 5);
    }
  });

  it('encodes left direction using Cartesian vector', () => {
    const mono = new Float32Array([1]);
    const result = encodeBufferFromDirection(mono, 0, 1, 0, 1); // +Y = left

    // Should match encodeBuffer(mono, 90, 0, 1)
    const expected = encodeBuffer(mono, 90, 0, 1);

    for (let ch = 0; ch < 4; ch++) {
      expect(result[ch][0]).toBeCloseTo(expected[ch][0], 5);
    }
  });

  it('encodes using Three.js coordinates', () => {
    const mono = new Float32Array([1]);
    // Three.js +Z = forward = ambisonics front
    const result = encodeBufferFromDirection(mono, 0, 0, 1, 1, 'threejs');
    const expected = encodeBuffer(mono, 0, 0, 1);

    for (let ch = 0; ch < 4; ch++) {
      expect(result[ch][0]).toBeCloseTo(expected[ch][0], 5);
    }
  });

  it('handles non-normalized vectors', () => {
    const mono = new Float32Array([1]);
    const result = encodeBufferFromDirection(mono, 10, 0, 0, 1); // Non-unit

    // Should still encode as front direction
    const expected = encodeBuffer(mono, 0, 0, 1);

    for (let ch = 0; ch < 4; ch++) {
      expect(result[ch][0]).toBeCloseTo(expected[ch][0], 5);
    }
  });
});

describe('encodeBuffer2DFromDirection', () => {
  it('encodes front direction using Cartesian vector', () => {
    const mono = new Float32Array([1]);
    const result = encodeBuffer2DFromDirection(mono, 1, 0, 0, 1);

    const expected = encodeBuffer2D(mono, 0, 1);

    for (let ch = 0; ch < 3; ch++) {
      expect(result[ch][0]).toBeCloseTo(expected[ch][0], 5);
    }
  });

  it('ignores z component', () => {
    const mono = new Float32Array([1]);
    const result1 = encodeBuffer2DFromDirection(mono, 1, 0, 0, 1);
    const result2 = encodeBuffer2DFromDirection(mono, 1, 0, 100, 1); // z ignored

    for (let ch = 0; ch < 3; ch++) {
      expect(result1[ch][0]).toBeCloseTo(result2[ch][0], 5);
    }
  });

  it('encodes using Three.js coordinates', () => {
    const mono = new Float32Array([1]);
    // Three.js +Z = forward
    const result = encodeBuffer2DFromDirection(mono, 0, 0, 1, 1, 'threejs');
    const expected = encodeBuffer2D(mono, 0, 1);

    for (let ch = 0; ch < 3; ch++) {
      expect(result[ch][0]).toBeCloseTo(expected[ch][0], 5);
    }
  });
});

describe('encodeAndSumBuffers', () => {
  it('returns correct number of channels', () => {
    const sources = [
      { samples: new Float32Array([1]), azim: 0, elev: 0 },
      { samples: new Float32Array([1]), azim: 90, elev: 0 },
    ];
    const result = encodeAndSumBuffers(sources, 1);
    expect(result.length).toBe(4);
  });

  it('handles empty sources array', () => {
    const result = encodeAndSumBuffers([], 1);
    expect(result.length).toBe(4);
    for (const channel of result) {
      expect(channel.length).toBe(0);
    }
  });

  it('sums multiple sources correctly', () => {
    const sources = [
      { samples: new Float32Array([1]), azim: 0, elev: 0 },
      { samples: new Float32Array([1]), azim: 0, elev: 0 },
    ];
    const summed = encodeAndSumBuffers(sources, 1);
    const single = encodeBuffer(new Float32Array([1]), 0, 0, 1);

    // Summing two identical sources should double the amplitude
    for (let ch = 0; ch < 4; ch++) {
      expect(summed[ch][0]).toBeCloseTo(single[ch][0] * 2, 5);
    }
  });

  it('handles sources with different lengths', () => {
    const sources = [
      { samples: new Float32Array([1, 2]), azim: 0, elev: 0 },
      { samples: new Float32Array([1, 2, 3, 4, 5]), azim: 90, elev: 0 },
    ];
    const result = encodeAndSumBuffers(sources, 1);

    // Output should be length of longest input
    for (const channel of result) {
      expect(channel.length).toBe(5);
    }
  });

  it('correctly sums sources at different directions', () => {
    // Front and left sources
    const frontSamples = new Float32Array([1]);
    const leftSamples = new Float32Array([1]);

    const sources = [
      { samples: frontSamples, azim: 0, elev: 0 },
      { samples: leftSamples, azim: 90, elev: 0 },
    ];

    const summed = encodeAndSumBuffers(sources, 1);
    const front = encodeBuffer(frontSamples, 0, 0, 1);
    const left = encodeBuffer(leftSamples, 90, 0, 1);

    // W should be sum of both W channels
    expect(summed[0][0]).toBeCloseTo(front[0][0] + left[0][0], 5);

    // Y should be mostly from left source
    expect(summed[1][0]).toBeCloseTo(front[1][0] + left[1][0], 5);

    // X should be mostly from front source
    expect(summed[3][0]).toBeCloseTo(front[3][0] + left[3][0], 5);
  });
});
