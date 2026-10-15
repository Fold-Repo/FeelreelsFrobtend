import stylistic from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import betterTailwind from 'eslint-plugin-better-tailwindcss'

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,

    {
        plugins: { '@stylistic': stylistic },
        rules: {
            '@stylistic/padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: '*', next: 'return' },
                { blankLine: 'always', prev: ['const', 'let'], next: '*' },
                {
                    blankLine: 'any',
                    prev: ['const', 'let'],
                    next: ['const', 'let'],
                },
            ],
            '@stylistic/jsx-self-closing-comp': 'error',

            'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],

            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
                    pathGroups: [
                        {
                            pattern: '{react,react-dom,next,next/**}',
                            group: 'external',
                            position: 'before',
                        },
                        { pattern: '@/**', group: 'internal' },
                    ],
                    pathGroupsExcludedImportTypes: ['react', 'next'],
                    'newlines-between': 'never',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
        },
    },

    {
        files: ['**/*.{ts,tsx}'],
        plugins: { 'better-tailwindcss': betterTailwind },
        settings: {
            'better-tailwindcss': {
                entryPoint: 'app/globals.css',
                callees: ['cn', 'clsx'],
            },
        },
        rules: betterTailwind.configs['correctness-error'].rules,
    },

    {
        files: ['app/**/route.tsx', 'app/**/*-image.tsx', 'app/apple-icon.tsx'],
        rules: { '@next/next/no-img-element': 'off' },
    },

    prettier,

    globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])

export default eslintConfig
