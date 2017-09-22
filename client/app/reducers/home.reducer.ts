import * as actions from '../actions/home.actions';

interface IAction {
	type:string,
	payload?:any
}

interface IState {
	time: number
}

const initialState = {
	time: 0
};

const homeReducer = (state:IState = initialState, action:IAction):IState => {
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

export default homeReducer;