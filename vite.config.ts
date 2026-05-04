import { defineConfig } from 'vite';

const commitHash = process.env.VITE_COMMIT_HASH?.slice(0, 7) || '';
const fileName = commitHash ? `star.${commitHash}.mjs` : 'star.mjs';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => fileName
    },
    outDir: 'dist',
    emptyOutDir: true
  }
});