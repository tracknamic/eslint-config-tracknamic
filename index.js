import js from '@eslint/js'
import n from 'eslint-plugin-n'
import promise from 'eslint-plugin-promise'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

const ignores = [
	'**/node_modules',
	'**/public',
	'**/dist',
]

const language = {
	name: 'tracknamic/language',
	languageOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		globals: {
			console: 'readonly',
			fetch: 'readonly',
			window: 'readonly',
			document: 'readonly',
			navigator: 'readonly',
			EventSource: 'readonly',
			FormData: 'readonly',
			localStorage: 'readonly',
			global: 'readonly',
			process: 'readonly',
			Buffer: 'readonly',
			setTimeout: 'readonly',
			clearTimeout: 'readonly',
			setInterval: 'readonly',
			clearInterval: 'readonly',
			setImmediate: 'readonly',
			clearImmediate: 'readonly',
			queueMicrotask: 'readonly',
		},
	},
	linterOptions: {
		reportUnusedDisableDirectives: true,
	},
}

const standardStyle = {
	name: 'tracknamic/standard-style',
	rules: {
		// StandardJS-style formatting
		semi: ['error', 'never'],
		quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
		indent: ['error', 'tab'],
		'arrow-parens': ['error', 'as-needed'],
		"comma-dangle": ["error", {
			"arrays": "only-multiline",
			"objects": "always-multiline",
			"imports": "only-multiline",
			"exports": "only-multiline"
		}],
		'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
		'object-curly-spacing': ['error', 'always'],
		'template-curly-spacing': ['error', 'never'],

		// Common code-quality preferences in StandardJS
		'no-var': 'error',
		'prefer-const': 'error',
		'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
		eqeqeq: ['error', 'always'],
		'no-unneeded-ternary': 'error',
		'no-useless-return': 'error',
		'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
		'spaced-comment': ['error', 'always', { markers: ['!'] }],
		'no-trailing-spaces': 'error',
		'eol-last': ['error', 'always'],

		// --- project guard ---
		'no-restricted-globals': ['error', { name: 'find', message: 'not imported' }],
	},
}

const reactAndHooks = {
	name: 'tracknamic/react+hooks',
	files: ['**/*.{js,jsx}'],
	plugins: { react: reactPlugin, 'react-hooks': reactHooks },
	languageOptions: {
		parserOptions: { ecmaFeatures: { jsx: true } },
	},
	settings: { react: { version: 'detect' } },
	rules: {
		...(reactPlugin.configs?.recommended?.rules ?? {}),
		...(reactHooks.configs?.recommended?.rules ?? {}),
		'react/react-in-jsx-scope': 'off',
		'react/jsx-uses-react': 'off',
	},
}

const nodeAndPromise = {
	name: 'tracknamic/node+promise',
	plugins: { n, promise },
	rules: {
		...(n.configs?.recommended?.rules ?? {}),
		...(promise.configs?.recommended?.rules ?? {}),
		// Our project uses path aliases (e.g., '@/components/*') via jsconfig
		// eslint-plugin-n does not understand these aliases, so disable its missing-import checks.
		'n/no-missing-import': 'off',
		'n/no-missing-require': 'off',
	},
}

const base = [
	{ name: 'tracknamic/ignores', ignores },
	js.configs.recommended,
	reactAndHooks,
	nodeAndPromise,
	language,
	standardStyle,
]

export default base
