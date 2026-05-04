import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';


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
  },
  plugins: [
    {
      name: 'generate-manifest',
      closeBundle() {
        const manifestPath = path.resolve(__dirname, 'manifest.json');
        if (fs.existsSync(manifestPath)) {
          const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
          manifest.extensions.forEach((ext: any) => {
            ext.entry = fileName;
          });
          
          if (!fs.existsSync(path.resolve(__dirname, 'dist'))) {
            fs.mkdirSync(path.resolve(__dirname, 'dist'));
          }
          
          fs.writeFileSync(
            path.resolve(__dirname, 'dist/manifest.json'),
            JSON.stringify(manifest, null, 2)
          );
        }
      }
    }
  ]

});