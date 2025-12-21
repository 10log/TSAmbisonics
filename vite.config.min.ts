import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ambisonics',
      fileName: (format) => {
        if (format === 'umd') return 'ambisonics.umd.min.js';
        if (format === 'es') return 'ambisonics.es.min.js';
        return `ambisonics.${format}.min.js`;
      },
    },
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    // emptyOutDir: false is required to preserve files from the non-minified build
    emptyOutDir: false,
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
