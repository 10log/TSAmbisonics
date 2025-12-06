import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ambisonics',
      fileName: (format) => {
        if (format === 'umd') return 'ambisonics.umd.js';
        if (format === 'es') return 'ambisonics.es.js';
        return `ambisonics.${format}.js`;
      },
    },
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
