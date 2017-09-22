/*
 * CSS|SASS preprocessor
 * Converts the CSS to a hashmap containing the selectors
 * Used to simulate css-loader in Webpack
 */
const cssjson = require('cssjson');
const fs = require('fs');
const postcss = require('postcss');
const values = require('object.values');

if(!Object.values) {
	values.shim();
}

module.exports = {
	getSelectors(rules) {
		let selectors = {};
		Object.keys(rules).forEach(rule => {
			if(rule.charAt(0) !== '@') {
				// Remove the first . or # (if there is one)
				let selectorName = rule.replace(/^[.#]/, '');
				// Remove any :pseudo
				selectorName = selectorName.replace(/:[A-Za-z0-9()-]+/g, '');
				// No spaces for you
				selectorName = selectorName.replace(/\s+/g, '');
				// Remove any [ ] attrs
				selectorName = selectorName.replace(/\[[^\]]+\]/, '');
				// Split any selectors up
				let selectorTree = selectorName.split(/[^A-Za-z0-9_-]/);
				// Add them all into the selector list
				selectorTree.forEach(sT => selectors[sT] = sT);
			}
			if(rules[rule].children) {
				Object.assign(selectors, this.getSelectors(rules[rule].children));
			}
		});
		return selectors;
	},
	process(src, path) {
		let stylesObject = {};
		if(/\.s?css$/i.test(path) && fs.existsSync(path)) {
			postcss([
				require('postcss-cssnext')({
					features: {
						customProperties: {
							variables: []
						}
					}
				}),
				require('postcss-css-variables')(),
				require('postcss-flexbugs-fixes')(),
				require('postcss-flexibility')(),
				require('postcss-import')(),
				require('postcss-modules-values')(),
				require('postcss-nested')(),
				require('postcss-simple-vars')()
			]).process(fs.readFileSync(path)).then(
				result => {
					let parsed = cssjson.toJSON(result.css.toString('utf8'));
					stylesObject = this.getSelectors(parsed.children);
				}
			)
		}
		return 'module.exports = ' + JSON.stringify(stylesObject);
	}
};
