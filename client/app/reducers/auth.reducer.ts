interface IAction {
	type:string,
	payload?:any
}

interface IState {
	loggedIn:boolean
}

const initialState:IState = {
	loggedIn: false
};

const authReducer = (state:IState = initialState, action:IAction):IState => {
	switch(action.type) {
		default:
			return state;
	}
};

export default authReducer;