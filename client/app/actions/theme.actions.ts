import {IAction} from 'actions/action.interface';

export const ACTIONS = {
    SET_THEME: 'SET_THEME'
};

const setTheme = (theme:string):IAction => {
    return {
        type: ACTIONS.SET_THEME,
        payload: theme
    }
};

export {setTheme};