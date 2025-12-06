/**
 * Test setup and Web Audio API mocks for TSAmbisonics
 */
import { vi } from 'vitest';

/**
 * Mock GainNode implementation
 */
class MockGainNode {
  gain: { value: number; setValueAtTime: ReturnType<typeof vi.fn> };
  channelCount: number;
  channelCountMode: string;
  channelInterpretation: string;
  numberOfInputs: number;
  numberOfOutputs: number;
  context: MockAudioContext;

  constructor(context: MockAudioContext) {
    this.gain = {
      value: 1,
      setValueAtTime: vi.fn(),
    };
    this.channelCount = 2;
    this.channelCountMode = 'max';
    this.channelInterpretation = 'speakers';
    this.numberOfInputs = 1;
    this.numberOfOutputs = 1;
    this.context = context;
  }

  connect = vi.fn().mockReturnThis();
  disconnect = vi.fn().mockReturnThis();
}

/**
 * Mock ChannelMergerNode implementation
 */
class MockChannelMergerNode {
  channelCount: number;
  channelCountMode: string;
  channelInterpretation: string;
  numberOfInputs: number;
  numberOfOutputs: number;
  context: MockAudioContext;

  constructor(context: MockAudioContext, numberOfInputs: number = 6) {
    this.numberOfInputs = numberOfInputs;
    this.numberOfOutputs = 1;
    this.channelCount = numberOfInputs;
    this.channelCountMode = 'explicit';
    this.channelInterpretation = 'discrete';
    this.context = context;
  }

  connect = vi.fn().mockReturnThis();
  disconnect = vi.fn().mockReturnThis();
}

/**
 * Mock ChannelSplitterNode implementation
 */
class MockChannelSplitterNode {
  channelCount: number;
  channelCountMode: string;
  channelInterpretation: string;
  numberOfInputs: number;
  numberOfOutputs: number;
  context: MockAudioContext;

  constructor(context: MockAudioContext, numberOfOutputs: number = 6) {
    this.numberOfInputs = 1;
    this.numberOfOutputs = numberOfOutputs;
    this.channelCount = numberOfOutputs;
    this.channelCountMode = 'explicit';
    this.channelInterpretation = 'discrete';
    this.context = context;
  }

  connect = vi.fn().mockReturnThis();
  disconnect = vi.fn().mockReturnThis();
}

/**
 * Mock ConvolverNode implementation
 */
class MockConvolverNode {
  buffer: AudioBuffer | null;
  normalize: boolean;
  channelCount: number;
  channelCountMode: string;
  numberOfInputs: number;
  numberOfOutputs: number;
  context: MockAudioContext;

  constructor(context: MockAudioContext) {
    this.buffer = null;
    this.normalize = true;
    this.channelCount = 2;
    this.channelCountMode = 'clamped-max';
    this.numberOfInputs = 1;
    this.numberOfOutputs = 1;
    this.context = context;
  }

  connect = vi.fn().mockReturnThis();
  disconnect = vi.fn().mockReturnThis();
}

/**
 * Mock AnalyserNode implementation
 */
class MockAnalyserNode {
  fftSize: number;
  frequencyBinCount: number;
  minDecibels: number;
  maxDecibels: number;
  smoothingTimeConstant: number;
  channelCount: number;
  channelCountMode: string;
  numberOfInputs: number;
  numberOfOutputs: number;
  context: MockAudioContext;

  constructor(context: MockAudioContext) {
    this.fftSize = 2048;
    this.frequencyBinCount = 1024;
    this.minDecibels = -100;
    this.maxDecibels = -30;
    this.smoothingTimeConstant = 0.8;
    this.channelCount = 2;
    this.channelCountMode = 'max';
    this.numberOfInputs = 1;
    this.numberOfOutputs = 1;
    this.context = context;
  }

  connect = vi.fn().mockReturnThis();
  disconnect = vi.fn().mockReturnThis();
  getFloatTimeDomainData = vi.fn((array: Float32Array) => {
    array.fill(0);
  });
  getByteTimeDomainData = vi.fn((array: Uint8Array) => {
    array.fill(128);
  });
  getFloatFrequencyData = vi.fn((array: Float32Array) => {
    array.fill(-100);
  });
  getByteFrequencyData = vi.fn((array: Uint8Array) => {
    array.fill(0);
  });
}

/**
 * Mock AudioBuffer implementation
 */
class MockAudioBuffer {
  sampleRate: number;
  length: number;
  duration: number;
  numberOfChannels: number;
  private _channelData: Float32Array[];

  constructor(options: { numberOfChannels: number; length: number; sampleRate: number }) {
    this.numberOfChannels = options.numberOfChannels;
    this.length = options.length;
    this.sampleRate = options.sampleRate;
    this.duration = options.length / options.sampleRate;
    this._channelData = [];
    for (let i = 0; i < options.numberOfChannels; i++) {
      this._channelData.push(new Float32Array(options.length));
    }
  }

  getChannelData(channel: number): Float32Array {
    return this._channelData[channel];
  }

  copyFromChannel(destination: Float32Array, channelNumber: number, startInChannel?: number): void {
    const start = startInChannel || 0;
    const source = this._channelData[channelNumber];
    for (let i = 0; i < destination.length && i + start < source.length; i++) {
      destination[i] = source[i + start];
    }
  }

  copyToChannel(source: Float32Array, channelNumber: number, startInChannel?: number): void {
    const start = startInChannel || 0;
    const dest = this._channelData[channelNumber];
    for (let i = 0; i < source.length && i + start < dest.length; i++) {
      dest[i + start] = source[i];
    }
  }
}

/**
 * Mock AudioContext implementation
 */
export class MockAudioContext {
  sampleRate: number;
  currentTime: number;
  state: string;
  destination: MockGainNode;

  constructor() {
    this.sampleRate = 48000;
    this.currentTime = 0;
    this.state = 'running';
    this.destination = new MockGainNode(this);
  }

  createGain(): MockGainNode {
    return new MockGainNode(this);
  }

  createChannelMerger(numberOfInputs?: number): MockChannelMergerNode {
    return new MockChannelMergerNode(this, numberOfInputs);
  }

  createChannelSplitter(numberOfOutputs?: number): MockChannelSplitterNode {
    return new MockChannelSplitterNode(this, numberOfOutputs);
  }

  createConvolver(): MockConvolverNode {
    return new MockConvolverNode(this);
  }

  createAnalyser(): MockAnalyserNode {
    return new MockAnalyserNode(this);
  }

  createBuffer(numberOfChannels: number, length: number, sampleRate: number): MockAudioBuffer {
    return new MockAudioBuffer({ numberOfChannels, length, sampleRate });
  }

  decodeAudioData = vi.fn().mockResolvedValue(
    new MockAudioBuffer({ numberOfChannels: 2, length: 1024, sampleRate: 48000 })
  );

  resume = vi.fn().mockResolvedValue(undefined);
  suspend = vi.fn().mockResolvedValue(undefined);
  close = vi.fn().mockResolvedValue(undefined);
}

/**
 * Create a mock AudioContext for testing
 */
export function createMockAudioContext(): AudioContext {
  return new MockAudioContext() as unknown as AudioContext;
}

/**
 * Create a mock AudioBuffer for testing
 */
export function createMockAudioBuffer(
  numberOfChannels: number,
  length: number,
  sampleRate: number = 48000
): AudioBuffer {
  return new MockAudioBuffer({ numberOfChannels, length, sampleRate }) as unknown as AudioBuffer;
}

// Set up global mocks
if (typeof window !== 'undefined') {
  (window as unknown as { AudioContext: typeof MockAudioContext }).AudioContext = MockAudioContext;
  (window as unknown as { AudioBuffer: typeof MockAudioBuffer }).AudioBuffer = MockAudioBuffer as unknown as typeof AudioBuffer;
}
