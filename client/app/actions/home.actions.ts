import {ajaxCall} from './ajax.actions';

export const ACTIONS = {
	REQUEST_TIME: 'REQUEST_TIME',
	STORE_TIME: 'STORE_TIME'
};

const requestTime = () => {
	return ajaxCall('/api/time', 'GET', '', storeTime());
};

const storeTime = () => {
	return (dispatch:Function, res:any) => {
		dispatch({type: ACTIONS.STORE_TIME, payload: res.time});
	}
};

export {requestTime};