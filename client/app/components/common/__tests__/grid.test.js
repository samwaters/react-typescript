import React from 'react';
import renderer from 'react-test-renderer';
import {Row, Col} from '../grid';

test('Grid renders', () => {
	const tree = renderer.create(
		<Row>
			<Col xs={6}>Left</Col>
			<Col xs={6}>Right</Col>
		</Row>
	).toJSON();
	expect(tree).toMatchSnapshot();
});