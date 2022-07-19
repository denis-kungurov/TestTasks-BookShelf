module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: [
		'@react-native-community',
		'eslint:recommended',
		'plugin:prettier/recommended',
		'plugin:react/recommended',
		'plugin:react-native/all',
		'plugin:import/warnings',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true, // Allows for the parsing of JSX
		},
	},
	settings: {
		'import/resolver': {
			node: {
				paths: ['src'],
				alias: {
					'src/api': './src/api',
					'src/components': './src/components',
					'src/screens': './src/screens',
					'src/hooks': './src/hooks',
				},
			},
		},
	},

	plugins: [
		'react',
		'prettier',
		'react-native',
		'import',
		'@typescript-eslint',
		'unused-imports',
	],
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			extends: ['plugin:@typescript-eslint/recommended'],
			rules: {
				'no-shadow': 0,
				'no-unused-vars': 0,
				'@typescript-eslint/no-shadow': 1,
				'@typescript-eslint/no-unused-vars': 2,
				'@typescript-eslint/no-empty-interface': [
					'error',
					{
						allowSingleExtends: true,
					},
				],
			},
		},
	],

	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
		__DEV__: 'readonly',
	},
	rules: {
		// NO everything
		'no-console': 0,
		'no-sequences': 2,
		'no-eval': 2,
		'no-extend-native': 2,
		'no-new-wrappers': 2,
		'no-with': 2,
		'no-var': 2,
		'no-spaced-func': 0,
		'no-unused-vars': 'off',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_',
			},
		],

		// React
		'react/no-access-state-in-setstate': 2,
		'react/no-array-index-key': 1,
		'react/no-did-update-set-state': 2,
		'react/no-direct-mutation-state': 2,
		'react/no-unused-prop-types': 2,
		'react/no-unused-state': 2,
		'react/jsx-no-bind': 1,
		'react/prop-types': 0,
		'react/require-default-props': 1,
		'react/jsx-boolean-value': 2,
		'react-native/no-raw-text': 0,
		'react-native/no-inline-styles': ['warn'],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': [
			'warn',
			{
				additionalHooks: 'useDidUpdate|useAnimatedStyle',
			},
		],
		'prefer-const': [
			'error',
			{
				destructuring: 'all',
				ignoreReadBeforeAssign: false,
			},
		],
		'react-native/sort-styles': 0,
		'react/sort-comp': [
			2,
			{
				order: [
					'static-variables',
					'static-methods',
					'instance-variables',
					'lifecycle',
					'everything-else',
					'/^handle.+$/',
					'/^render.+$/',
					'render',
				],
			},
		],
		// Other
		'object-curly-newline': [
			'error',
			{
				ObjectExpression: {
					multiline: true,
					minProperties: 1,
				},
				ObjectPattern: {
					consistent: true,
					multiline: true,
				},
				ImportDeclaration: {
					multiline: true,
				},
				ExportDeclaration: {
					multiline: true,
				},
			},
		],
		'import/first': 2,
		'import/no-named-as-default': 0,
		'import/no-named-as-default-member': 0,
		'import/order': [
			'error',
			{
				pathGroups: [
					{
						pattern: 'components',
						group: 'internal',
					},
					{
						pattern: 'components/**',
						group: 'internal',
					},
					{
						pattern: 'navigation',
						group: 'internal',
					},
					{
						pattern: 'navigation/**',
						group: 'internal',
					},
					{
						pattern: 'constants/**',
						group: 'internal',
					},
					{
						pattern: 'api/**',
						group: 'internal',
					},
					{
						pattern: 'hooks',
						group: 'internal',
					},
					{
						pattern: 'hooks/**',
						group: 'internal',
					},
				],
				pathGroupsExcludedImportTypes: ['internal'],
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
				],
				'newlines-between': 'always',
			},
		],
		'import/imports-first': ['error', 'absolute-first'],
		'prettier/prettier': [
			'error',
			{
				arrowParens: 'avoid',
			},
		],
		'react-native/no-color-literals': 0,
	},
};
