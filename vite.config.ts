import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/star.ts',
      formats: ['es'],
      fileName: () => 'star.mjs'
    },
    outDir: 'dist',
    emptyOutDir: true
  }
});

