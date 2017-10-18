import {IAction} from "actions/action.interface";

interface IAuthState {
	loggedIn:boolean
}

const initialState:IAuthState = {
	loggedIn: false
};

const authReducer = (state:IAuthState = initialState, action:IAction):IAuthState => {
	switch(action.type) {
		default:
			return state;
	}
};

export {authReducer, IAuthState};
