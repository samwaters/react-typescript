import React from 'react';
import renderer from 'react-test-renderer';
import {Error, Information, Success, Warning} from '../messages';

test('Error renders', () => {
	const tree = renderer.create(
		<Error>Sample Error Message</Error>
	).toJSON();
	expect(tree).toMatchSnapshot();
});

test('Information renders', () => {
	const tree = renderer.create(
		<Information>Sample Error Message</Information>
	).toJSON();
	expect(tree).toMatchSnapshot();
});

test('Success renders', () => {
	const tree = renderer.create(
		<Success>Sample Error Message</Success>
	).toJSON();
	expect(tree).toMatchSnapshot();
});

test('Warning renders', () => {
	const tree = renderer.create(
		<Warning>Sample Error Message</Warning>
	).toJSON();
	expect(tree).toMatchSnapshot();
});