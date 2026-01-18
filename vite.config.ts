import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/lib/index.ts'),
            name: 'ZenUI',
            fileName: 'personal-library',
        },
        rollupOptions: {
            external: [/^lit/],
        },
    },
    plugins: [
        dts({ rollupTypes: true })
    ],
});
