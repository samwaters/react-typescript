const extractValues = require('modules-values-extract');
const path = require('path');
const themeVariables = {};

module.exports = extractValues({
	files: [path.join(__dirname, 'client', 'theme', 'theme.css')],
}).then(
	variables => {
		Object.keys(variables).forEach(key => themeVariables['--' + key] = variables[key]);
		return config;
	}
);

const config = {
	map: process.env.isDev === '1',
	plugins: {
		'postcss-cssnext': {
			features: {
				customProperties: {
					variables: themeVariables
				}
			}
		},
		'postcss-css-variables': {},
		'postcss-flexbugs-fixes': {},
		'postcss-flexibility': {},
		'postcss-import': {},
		'postcss-modules-values': {},
		'postcss-nested': {},
		'postcss-simple-vars': {}
	}
};
