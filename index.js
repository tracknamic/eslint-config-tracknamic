import js from '@eslint/js'
import { flatConfigs } from 'eslint-plugin-import-x'
import n from 'eslint-plugin-n'
import promise from 'eslint-plugin-promise'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

const ignores = [
	'**/node_modules',
	'**/dist',
]

const language = {
	name: 'tracknamic/language',
	languageOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		globals: {
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
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'arrow-parens': ['error', 'as-needed'],
		'comma-dangle': ['error', 'always-multiline'],
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
	},
}

const react = {
	name: 'tracknamic/react+hooks',
	files: ['**/*.{js,jsx}'],
	plugins: { react, 'react-hooks': reactHooks },
	languageOptions: {
		parserOptions: { ecmaFeatures: { jsx: true } }
	},
	settings: { react: { version: 'detect' } },
	rules: {
		...(react.configs?.recommended?.rules ?? {}),
		...(reactHooks.configs?.recommended?.rules ?? {})
	}
}

const node = {
	name: 'tracknamic/node+promise',
	plugins: { n, promise },
	rules: {
		...(n.configs?.recommended?.rules ?? {}),
		...(promise.configs?.recommended?.rules ?? {}),
	},
}

const base = [
	{ name: 'tracknamic/ignores', ignores },
	js.configs.recommended,
	flatConfigs.recommended,
	react,
	node,
	language,
	standardStyle,
]

export default base
