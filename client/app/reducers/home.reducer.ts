import * as actions from '../actions/home.actions';
import IAction from "reducers/action.interface";

interface IHomeState {
	time: number
}

const initialState:IHomeState = {
	time: 0
};

const homeReducer = (state:IHomeState = initialState, action:IAction):IHomeState => {
	switch(action.type) {
		case actions.ACTIONS.STORE_TIME:
			return {
				...state,
				time: action.payload
			};
		default:
			return state;
	}
};

export {homeReducer, IHomeState};
