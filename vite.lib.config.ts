import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import fs from 'node:fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-zen-tokens-css',
      closeBundle() {
        const outDir = resolve(__dirname, 'dist/lib');
        fs.mkdirSync(outDir, { recursive: true });
        fs.copyFileSync(
          resolve(__dirname, 'src/lib/styles/zen-tokens.css'),
          resolve(outDir, 'tokens.css')
        );
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
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'lucide-react',
        'gsap',
        '@gsap/react',
      ],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name].js',
      },
    },
  },
});
