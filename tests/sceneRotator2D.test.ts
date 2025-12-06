/**
 * Tests for sceneRotator2D class
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { createMockAudioContext } from './setup';
import sceneRotator2D from '../src/ambi-sceneRotator2D';

describe('sceneRotator2D', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  describe('constructor', () => {
    it('creates a rotator with correct order', () => {
      const rotator = new sceneRotator2D(audioCtx, 1);
      expect(rotator.order).toBe(1);
    });

    it('calculates correct channel count for order 1 (2D)', () => {
      const rotator = new sceneRotator2D(audioCtx, 1);
      expect(rotator.nCh).toBe(3); // 2*1 + 1 = 3
    });

    it('calculates correct channel count for order 3 (2D)', () => {
      const rotator = new sceneRotator2D(audioCtx, 3);
      expect(rotator.nCh).toBe(7); // 2*3 + 1 = 7
    });

    it('initializes yaw to 0', () => {
      const rotator = new sceneRotator2D(audioCtx, 1);
      expect(rotator.yaw).toBe(0);
    });

    it('stores reference to audio context', () => {
      const rotator = new sceneRotator2D(audioCtx, 1);
      expect(rotator.ctx).toBe(audioCtx);
    });

    it('creates input and output nodes', () => {
      const rotator = new sceneRotator2D(audioCtx, 1);
      expect(rotator.in).toBeDefined();
      expect(rotator.out).toBeDefined();
    });
  });

  describe('rotation angles', () => {
    it('allows setting yaw', () => {
      const rotator = new sceneRotator2D(audioCtx, 1);
      rotator.yaw = 90;
      expect(rotator.yaw).toBe(90);
    });

    it('allows negative yaw values', () => {
      const rotator = new sceneRotator2D(audioCtx, 1);
      rotator.yaw = -90;
      expect(rotator.yaw).toBe(-90);
    });

    it('allows full rotation', () => {
      const rotator = new sceneRotator2D(audioCtx, 1);
      rotator.yaw = 360;
      expect(rotator.yaw).toBe(360);
    });
  });

  describe('updateRotMtx', () => {
    it('does not throw when called with default values', () => {
      const rotator = new sceneRotator2D(audioCtx, 1);
      expect(() => rotator.updateRotMtx()).not.toThrow();
    });

    it('can be called after changing yaw', () => {
      const rotator = new sceneRotator2D(audioCtx, 1);
      rotator.yaw = 90;
      expect(() => rotator.updateRotMtx()).not.toThrow();
    });

    it('can be called multiple times', () => {
      const rotator = new sceneRotator2D(audioCtx, 1);
      rotator.yaw = 0;
      rotator.updateRotMtx();
      rotator.yaw = 90;
      rotator.updateRotMtx();
      rotator.yaw = 180;
      expect(() => rotator.updateRotMtx()).not.toThrow();
    });
  });

  describe('different orders', () => {
    it('creates order 0 rotator with 1 channel', () => {
      const rotator = new sceneRotator2D(audioCtx, 0);
      expect(rotator.nCh).toBe(1);
    });

    it('creates order 2 rotator with 5 channels', () => {
      const rotator = new sceneRotator2D(audioCtx, 2);
      expect(rotator.nCh).toBe(5);
    });

    it('higher order rotator can update rotation matrix', () => {
      const rotator = new sceneRotator2D(audioCtx, 3);
      rotator.yaw = 45;
      expect(() => rotator.updateRotMtx()).not.toThrow();
    });
  });
});
