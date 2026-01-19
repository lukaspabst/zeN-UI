import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        include: ['src/**/*.test.ts'],
        coverage: {
            provider: 'v8',
            include: ['src/lib/**/*.ts'],
            exclude: ['src/lib/**/*.stories.ts', 'src/lib/index.ts'],
        },
        passWithNoTests: true,
    },
});
