import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import fs from 'node:fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-zen-tokens-css-and-client-banner',
      closeBundle() {
        const outDir = resolve(__dirname, 'dist/lib');
        fs.mkdirSync(outDir, { recursive: true });
        const themesCss = fs.readFileSync(
          resolve(__dirname, 'src/lib/styles/zen-themes.css'),
          'utf8'
        );
        const primitivesCss = fs.readFileSync(
          resolve(__dirname, 'src/lib/styles/zen-primitives.css'),
          'utf8'
        );
        fs.writeFileSync(
          resolve(outDir, 'tokens.css'),
          `${themesCss.trimEnd()}\n\n${primitivesCss.trimStart()}`,
          'utf8'
        );
        for (const relEntry of ['index.js', 'audio/index.js']) {
          const entryPath = resolve(outDir, relEntry);
          if (fs.existsSync(entryPath)) {
            const raw = fs.readFileSync(entryPath, 'utf8');
            if (!raw.startsWith("'use client'")) {
              fs.writeFileSync(entryPath, `'use client';\n${raw}`, 'utf8');
            }
          }
        }
      },
    },
  ],
  build: {
    outDir: 'dist/lib',
    emptyOutDir: true,
    copyPublicDir: false,
    lib: {
      entry: {
        index: resolve(__dirname, 'src/lib/index.ts'),
        'audio/index': resolve(__dirname, 'src/lib/audio/index.ts'),
        'capri/index': resolve(__dirname, 'src/lib/capri/index.ts'),
        'universal/zen-universal': resolve(
          __dirname,
          'src/lib/universal/zen-universal.ts'
        ),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name].js',
      },
    },
  },
});
