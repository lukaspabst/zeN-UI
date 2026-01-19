import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig(({ command, mode }) => {
    const isStorybookBuild = process.argv.some(arg => arg.includes('storybook'));

    return {
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
        plugins: isStorybookBuild ? [] : [dts({ rollupTypes: true })],
    };
});
