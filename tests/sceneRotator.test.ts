/**
 * Tests for sceneRotator class
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { createMockAudioContext } from './setup';
import sceneRotator from '../src/ambi-sceneRotator';

describe('sceneRotator', () => {
  let audioCtx: AudioContext;

  beforeEach(() => {
    audioCtx = createMockAudioContext();
  });

  describe('constructor', () => {
    it('creates a rotator with correct order', () => {
      const rotator = new sceneRotator(audioCtx, 1);
      expect(rotator.order).toBe(1);
    });

    it('calculates correct channel count for order 1', () => {
      const rotator = new sceneRotator(audioCtx, 1);
      expect(rotator.nCh).toBe(4);
    });

    it('calculates correct channel count for order 3', () => {
      const rotator = new sceneRotator(audioCtx, 3);
      expect(rotator.nCh).toBe(16);
    });

    it('initializes yaw to 0', () => {
      const rotator = new sceneRotator(audioCtx, 1);
      expect(rotator.yaw).toBe(0);
    });

    it('initializes pitch to 0', () => {
      const rotator = new sceneRotator(audioCtx, 1);
      expect(rotator.pitch).toBe(0);
    });

    it('initializes roll to 0', () => {
      const rotator = new sceneRotator(audioCtx, 1);
      expect(rotator.roll).toBe(0);
    });

    it('stores reference to audio context', () => {
      const rotator = new sceneRotator(audioCtx, 1);
      expect(rotator.ctx).toBe(audioCtx);
    });

    it('creates input and output nodes', () => {
      const rotator = new sceneRotator(audioCtx, 1);
      expect(rotator.in).toBeDefined();
      expect(rotator.out).toBeDefined();
    });
  });

  describe('rotation angles', () => {
    it('allows setting yaw', () => {
      const rotator = new sceneRotator(audioCtx, 1);
      rotator.yaw = 90;
      expect(rotator.yaw).toBe(90);
    });

    it('allows setting pitch', () => {
      const rotator = new sceneRotator(audioCtx, 1);
      rotator.pitch = 45;
      expect(rotator.pitch).toBe(45);
    });

    it('allows setting roll', () => {
      const rotator = new sceneRotator(audioCtx, 1);
      rotator.roll = 30;
      expect(rotator.roll).toBe(30);
    });

    it('allows negative yaw values', () => {
      const rotator = new sceneRotator(audioCtx, 1);
      rotator.yaw = -90;
      expect(rotator.yaw).toBe(-90);
    });

    it('allows negative pitch values', () => {
      const rotator = new sceneRotator(audioCtx, 1);
      rotator.pitch = -45;
      expect(rotator.pitch).toBe(-45);
    });

    it('allows negative roll values', () => {
      const rotator = new sceneRotator(audioCtx, 1);
      rotator.roll = -30;
      expect(rotator.roll).toBe(-30);
    });
  });

  describe('updateRotMtx', () => {
    it('does not throw when called with default values', () => {
      const rotator = new sceneRotator(audioCtx, 1);
      expect(() => rotator.updateRotMtx()).not.toThrow();
    });

    it('can be called after changing yaw', () => {
      const rotator = new sceneRotator(audioCtx, 1);
      rotator.yaw = 90;
      expect(() => rotator.updateRotMtx()).not.toThrow();
    });

    it('can be called after changing pitch', () => {
      const rotator = new sceneRotator(audioCtx, 1);
      rotator.pitch = 45;
      expect(() => rotator.updateRotMtx()).not.toThrow();
    });

    it('can be called after changing roll', () => {
      const rotator = new sceneRotator(audioCtx, 1);
      rotator.roll = 30;
      expect(() => rotator.updateRotMtx()).not.toThrow();
    });

    it('can be called with all angles set', () => {
      const rotator = new sceneRotator(audioCtx, 1);
      rotator.yaw = 10;
      rotator.pitch = 50;
      rotator.roll = -30;
      expect(() => rotator.updateRotMtx()).not.toThrow();
    });

    it('can be called multiple times', () => {
      const rotator = new sceneRotator(audioCtx, 1);
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
      const rotator = new sceneRotator(audioCtx, 0);
      expect(rotator.nCh).toBe(1);
    });

    it('creates order 2 rotator with 9 channels', () => {
      const rotator = new sceneRotator(audioCtx, 2);
      expect(rotator.nCh).toBe(9);
    });

    it('creates order 4 rotator with 25 channels', () => {
      const rotator = new sceneRotator(audioCtx, 4);
      expect(rotator.nCh).toBe(25);
    });

    it('higher order rotator can update rotation matrix', () => {
      const rotator = new sceneRotator(audioCtx, 3);
      rotator.yaw = 45;
      rotator.pitch = 30;
      rotator.roll = 15;
      expect(() => rotator.updateRotMtx()).not.toThrow();
    });
  });
});
