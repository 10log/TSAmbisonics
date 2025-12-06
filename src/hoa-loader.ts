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

import { type LoaderCallback, getAmbisonicChannelCount } from './types';

////////////////
/* HOA LOADER */
////////////////

function pad(num: number, size: number): string {
  return ('000000000' + num).substr(-size);
}

export default class HOAloader {
  readonly context: AudioContext;
  readonly order: number;
  readonly nCh: number;
  readonly nChGroups: number;
  readonly onLoad: LoaderCallback;
  readonly urls: string[];

  private buffers: AudioBuffer[];
  private loadCount: number;
  private loaded: boolean;
  private fileExt: string;
  private concatBuffer: AudioBuffer | null;

  constructor(
    context: AudioContext,
    order: number,
    url: string,
    callback: LoaderCallback
  ) {
    this.context = context;
    this.order = order;
    this.nCh = getAmbisonicChannelCount(order);
    this.nChGroups = Math.ceil(this.nCh / 8);
    this.buffers = new Array();
    this.loadCount = 0;
    this.loaded = false;
    this.onLoad = callback;
    this.urls = new Array(this.nChGroups);
    this.concatBuffer = null;

    const fileExt = url.slice(url.length - 3, url.length);
    this.fileExt = fileExt;

    for (let i = 0; i < this.nChGroups; i++) {
      if (i === this.nChGroups - 1) {
        this.urls[i] =
          url.slice(0, url.length - 4) +
          '_' +
          pad(i * 8 + 1, 2) +
          '-' +
          pad(this.nCh, 2) +
          'ch.' +
          fileExt;
      } else {
        this.urls[i] =
          url.slice(0, url.length - 4) +
          '_' +
          pad(i * 8 + 1, 2) +
          '-' +
          pad(i * 8 + 8, 2) +
          'ch.' +
          fileExt;
      }
    }
  }

  loadBuffers(url: string, index: number): void {
    // Load buffer asynchronously
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    const scope = this;

    request.onload = function () {
      // Asynchronously decode the audio file data in request.response
      scope.context.decodeAudioData(
        request.response,
        function (buffer) {
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }
          scope.buffers[index] = buffer;
          scope.loadCount++;
          if (scope.loadCount === scope.nChGroups) {
            scope.loaded = true;
            scope.concatBuffers();
            console.log('HOAloader: all buffers loaded and concatenated');
            scope.onLoad(scope.concatBuffer!);
          }
        },
        function (error) {
          alert(
            'Browser cannot decode audio data:  ' +
              url +
              '\n\nError: ' +
              error +
              "\n\n(If you re using Safari and get a null error, this is most likely due to Apple's shady plan going on to stop the .ogg format from easing web developer's life :)"
          );
        }
      );
    };

    request.onerror = function () {
      alert('HOAloader: XHR error');
    };

    request.send();
  }

  load(): void {
    for (let i = 0; i < this.nChGroups; ++i) this.loadBuffers(this.urls[i], i);
  }

  concatBuffers(): void {
    if (!this.loaded) return;

    const nCh = this.nCh;
    const nChGroups = this.nChGroups;

    let length = this.buffers[0].length;
    this.buffers.forEach((b) => {
      length = Math.max(length, b.length);
    });
    const srate = this.buffers[0].sampleRate;

    // Detect if the 8-ch audio file is OGG, then remap 8-channel files to the correct
    // order cause Chrome and Firefox messes it up when loading. Other browsers have not
    // been tested with OGG files. 8ch Wave files work fine for both browsers.
    let remap8ChanFile = [1, 2, 3, 4, 5, 6, 7, 8];
    if (this.fileExt.toLowerCase() === 'ogg') {
      console.log(
        'Loading of 8chan OGG files [Chrome/Firefox]: remap channels to correct order!'
      );
      remap8ChanFile = [1, 3, 2, 7, 8, 5, 6, 4];
    }

    this.concatBuffer = this.context.createBuffer(nCh, length, srate);
    for (let i = 0; i < nChGroups; i++) {
      for (let j = 0; j < this.buffers[i].numberOfChannels; j++) {
        this.concatBuffer
          .getChannelData(i * 8 + j)
          .set(this.buffers[i].getChannelData(remap8ChanFile[j] - 1));
      }
    }
  }
}
