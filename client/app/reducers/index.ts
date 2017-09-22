import {combineReducers} from 'redux';
import {authReducer, IAuthState} from './auth.reducer';
import {homeReducer, IHomeState} from './home.reducer';
import {routerReducer} from 'react-router-redux';

interface IAppState {
	auth: IAuthState;
	home: IHomeState;
	router: any;
}

const appReducers = combineReducers({
	auth: authReducer,
	home: homeReducer,
	router: routerReducer
});
export {appReducers, IAppState};
