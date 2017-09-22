import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import HomeComponent from '../home';

const mockStore = configureStore([thunk]);
const store = mockStore({home:{time:0}});
test('Home renders', () => {
	const tree = renderer.create(
		<Provider store={store}>
			<HomeComponent />
		</Provider>
	).toJSON();
	expect(tree).toMatchSnapshot();
});

test('Time updates', () => {
	const tree = mount(
		<Provider store={store}>
			<HomeComponent />
		</Provider>
	);
	tree.find('button').at(0).simulate('click');
	// Let the ajax response come back
	setTimeout(() => {
		const actions = store.getActions();
		expect(actions.length).toBe(1)
	}, 100);
});
