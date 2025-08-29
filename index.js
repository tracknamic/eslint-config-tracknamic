import standard from '@eslinter/eslint-config-standard'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import stylistic from '@stylistic/eslint-plugin'

/**
 * Tracknamic flat ESLint config
 * - Base: StandardJS (flat)
 * - Formatter: ESLint + @stylistic (no Prettier/compat required)
 * - React: react + react-hooks
 */
export default [
	// 1) StandardJS baseline (flat)
	standard,
	// 2) Tracknamic customizations
	{
		files: ['**/*.{js,jsx,mjs,cjs}'],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			parserOptions: { ecmaFeatures: { jsx: true } },
		},
		plugins: {
			react: reactPlugin,
			'react-hooks': reactHooks,
			'@stylistic': stylistic,
		},
		settings: {
			react: { version: 'detect' },
		},
		rules: {
			// --- formatting via @stylistic (acts as your formatter with --fix) ---
			'@stylistic/indent': ['error', 'tab', { SwitchCase: 1 }],
			'@stylistic/comma-dangle': ['error', {
				arrays: 'only-multiline',
				objects: 'always-multiline',
				imports: 'only-multiline',
				exports: 'only-multiline',
			}],
			'@stylistic/no-tabs': ['error', { allowIndentationTabs: true }],
			'@stylistic/jsx-indent': ['error', 'tab', {
				checkAttributes: true,
				indentLogicalExpressions: true,
			}],
			'@stylistic/jsx-indent-props': ['error', 'tab'],

			// --- react specifics (same intent as your legacy rules) ---
			// 'react/react-in-jsx-scope': 'off', // React 17+ doesn’t require it
			// 'react/jsx-uses-react': 'off',

			// hooks recommended (flat form)
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			// --- project guard ---
			'no-restricted-globals': ['error', { name: 'find', message: 'not imported' }],
		},
	},

	// 3) Common ignores
	{
		ignores: [
			'node_modules/**',
			'dist/**',
			'build/**',
			'coverage/**',
			'**/*.min.js'
		],
	}
]
