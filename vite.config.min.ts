import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
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
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
  optimizeDeps: {
    include: ['spherical-harmonic-transform', 'numeric'],
  },
});
