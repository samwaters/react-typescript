import {combineReducers} from 'redux';
import {authReducer, IAuthState} from './auth.reducer';
import {homeReducer, IHomeState} from './home.reducer';
import {routerReducer} from 'react-router-redux';
import {themeReducer, IThemeState} from "reducers/theme.reducer";

interface IAppState {
    auth: IAuthState;
    home: IHomeState;
    router: any;
    theme: IThemeState;
}

const appReducers = combineReducers({
    auth: authReducer,
    home: homeReducer,
    router: routerReducer,
    theme: themeReducer
});
export {appReducers, IAppState};
