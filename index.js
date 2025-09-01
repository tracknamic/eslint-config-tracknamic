import js from '@eslint/js'
import importX from 'eslint-plugin-import-x'
import n from 'eslint-plugin-n'
import promise from 'eslint-plugin-promise'

const ignores = [
	'**/node_modules',
	'**/dist',
]

const language = {
	name: 'tracknamic/language',
	languageOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	linterOptions: {
		reportUnusedDisableDirectives: true
	}
}

const standardStyle = {
	name: 'tracknamic/standard-style',
	rules: {
		// StandardJS-style formatting
		semi: ['error', 'never'],
		quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
		indent: ['error', 2, { SwitchCase: 1 }],
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
		'eol-last': ['error', 'always']
	}
}

const base = [
	{ name: 'tracknamic/ignores', ignores },
	js.configs.recommended,
	importX.flatConfigs.recommended,
	{
		name: 'tracknamic/node+promise',
		plugins: { n, promise },
		rules: {
			...(n.configs?.recommended?.rules ?? {}),
			...(promise.configs?.recommended?.rules ?? {})
		}
	},
	language,
	standardStyle
]

export default base
