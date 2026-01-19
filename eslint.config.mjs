import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import lit from 'eslint-plugin-lit';

export default [
    { ignores: ['dist', 'node_modules', 'storybook-static'] },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    lit.configs['flat/recommended'],
    {
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            'lit/no-legacy-template-syntax': 'error',
            'lit/no-property-change-update': 'error',
        },
    },
];
