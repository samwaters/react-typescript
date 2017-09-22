import React from 'react';
import renderer from 'react-test-renderer';
import NotFoundComponent from '../notfound';

test('NotFound renders', () => {
	const tree = renderer.create(
		<NotFoundComponent />
	).toJSON();
	expect(tree).toMatchSnapshot();
});
