import * as actions from 'actions/theme.actions';
import {IAction} from 'actions/action.interface';
import * as colours from '../../theme/colours.css';

interface ITheme {
	primary1Color: string;
	primary2Color: string;
	primary3Color: string;
	accent1Color: string;
	accent2Color: string;
	accent3Color: string;
	textColor: string;
	alternateTextColor: string;
}

interface IThemeState {
	currentTheme: string;
	themes: { [key: string]: ITheme };
}

const initialState: IThemeState = {
	currentTheme: 'theme1',
	themes: {
		'theme1': {
			primary1Color: colours.purple1,
			primary2Color: colours.purple2,
			primary3Color: colours.purple2,
			accent1Color: colours.green1,
			accent2Color: colours.green2,
			accent3Color: colours.green3,
			textColor: colours.black,
			alternateTextColor: colours.white
		},
		'theme2': {
			primary1Color: colours.orange1,
			primary2Color: colours.orange2,
			primary3Color: colours.orange3,
			accent1Color: colours.blue1,
			accent2Color: colours.blue2,
			accent3Color: colours.blue3,
			textColor: colours.black,
			alternateTextColor: colours.white
		},
		'theme3': {
			primary1Color: colours.pink1,
			primary2Color: colours.pink2,
			primary3Color: colours.pink3,
			accent1Color: colours.yellow1,
			accent2Color: colours.yellow2,
			accent3Color: colours.yellow3,
			textColor: colours.black,
			alternateTextColor: colours.white
		}
	}
};

const themeReducer = (state: IThemeState = initialState, action: IAction): IThemeState => {
	switch(action.type) {
		case actions.ACTIONS.SET_THEME:
			return {
				...state,
				currentTheme: action.payload
			};
		default:
			return state;
	}
};

export {themeReducer, ITheme, IThemeState};
