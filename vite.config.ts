import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/__target__/star.js',
      formats: ['es'],
      fileName: () => 'star.mjs'
    },
    outDir: 'dist',
    emptyOutDir: true
  }
});

