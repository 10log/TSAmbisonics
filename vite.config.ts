import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      include: ['src/**/*.ts', 'src/**/*.d.ts'],
      outDir: 'dist',
      copyDtsFiles: true,
    }),
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ambisonics',
      fileName: (format) => {
        if (format === 'umd') return 'ambisonics.umd.js';
        if (format === 'es') return 'ambisonics.es.js';
        return `ambisonics.${format}.js`;
      },
    },
    outDir: 'dist',
    sourcemap: true,
    minify: false,
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
