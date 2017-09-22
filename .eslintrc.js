module.exports = {
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
			experimentalObjectRestSpread: true,
		}
	},
	plugins: [
		'react',
	],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
	],
	rules: {
		'react/prop-types': ['off'],
		'react/display-name': ['off'],
		'no-console': ['warn', { "allow": ["warn", "error"] }],
		//'arrow-parens': ['warn', 'as-needed'],
	},
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	globals: {
		_: true,
		Promise: true,
	}
};
