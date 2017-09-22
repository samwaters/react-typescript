// React
import * as React from 'react';
import {render} from 'react-dom';
import 'babel-polyfill';
// Router
import createHistory from 'history/createHashHistory';
import {Route} from 'react-router';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
// Redux
import appReducers from './reducers/index';
import {applyMiddleware, createStore, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
// Components
import AppComponent from './app';

interface DevtoolsWindow extends Window {
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?:any
}

const history = createHistory();
const middleware = routerMiddleware(history);
const win:DevtoolsWindow = window;
const enhancers = win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
	appReducers,
	enhancers(applyMiddleware(thunk, middleware))
);

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Route component={AppComponent} />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('app')
);
