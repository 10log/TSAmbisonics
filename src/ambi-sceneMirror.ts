////////////////////////////////////////////////////////////////////
//  Archontis Politis
//  archontis.politis@aalto.fi
//  David Poirier-Quinot
//  davipoir@ircam.fr
////////////////////////////////////////////////////////////////////
//
//  JSAmbisonics a JavaScript library for higher-order Ambisonics
//  The library implements Web Audio blocks that perform
//  typical ambisonic processing operations on audio signals.
//
////////////////////////////////////////////////////////////////////

/////////////////
/* HOA MIRROR */
/////////////////

import {
  type AmbisonicProcessor,
  type MirrorPlane,
  getAmbisonicChannelCount,
} from './types';

export default class sceneMirror implements AmbisonicProcessor {
  readonly ctx: AudioContext;
  readonly order: number;
  readonly nCh: number;
  readonly in: ChannelSplitterNode;
  readonly out: ChannelMergerNode;

  mirrorPlane: MirrorPlane;
  private gains: GainNode[];

  constructor(audioCtx: AudioContext, order: number) {
    this.ctx = audioCtx;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.mirrorPlane = 0;

    // Input and output nodes
    this.in = this.ctx.createChannelSplitter(this.nCh);
    this.out = this.ctx.createChannelMerger(this.nCh);

    // Initialize mirroring gains to unity (no reflection) and connect
    this.gains = new Array(this.nCh);
    for (let q = 0; q < this.nCh; q++) {
      this.gains[q] = this.ctx.createGain();
      this.gains[q].gain.value = 1;
      // Create connections
      this.in.connect(this.gains[q], q, 0);
      this.gains[q].connect(this.out, 0, q);
    }
  }

  reset(): void {
    for (let q = 0; q < this.nCh; q++) {
      this.gains[q].gain.value = 1;
    }
  }

  mirror(planeNo: MirrorPlane): void {
    switch (planeNo) {
      case 0:
        this.mirrorPlane = 0;
        this.reset();
        break;
      case 1:
        // mirroring on yz-plane (front-back)
        this.reset();
        this.mirrorPlane = 1;
        for (let n = 0; n <= this.order; n++) {
          for (let m = -n; m <= n; m++) {
            const q = n * n + n + m;
            if ((m < 0 && m % 2 === 0) || (m > 0 && m % 2 === 1)) {
              this.gains[q].gain.value = -1;
            }
          }
        }
        break;
      case 2:
        // mirroring on xz-plane (left-right)
        this.reset();
        this.mirrorPlane = 2;
        for (let n = 0; n <= this.order; n++) {
          for (let m = -n; m <= n; m++) {
            const q = n * n + n + m;
            if (m < 0) {
              this.gains[q].gain.value = -1;
            }
          }
        }
        break;
      case 3:
        // mirroring on xy-plane (up-down)
        this.reset();
        this.mirrorPlane = 3;
        for (let n = 0; n <= this.order; n++) {
          for (let m = -n; m <= n; m++) {
            const q = n * n + n + m;
            if ((m + n) % 2 === 1) {
              this.gains[q].gain.value = -1;
            }
          }
        }
        break;
      default:
        console.log(
          'The mirroring planes can be either 1 (yz), 2 (xz), 3 (xy), or 0 (no mirroring). Value set to 0.'
        );
        this.mirrorPlane = 0;
        this.reset();
    }
  }
}
