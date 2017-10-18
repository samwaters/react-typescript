import ajaxCall from './ajax.actions';

export const ACTIONS = {
	REQUEST_TIME: 'REQUEST_TIME',
	STORE_TIME: 'STORE_TIME'
};

const requestTime = () => {
	return ajaxCall({
		data: '',
		method: 'GET',
		nextAction: storeTime(),
		url: '/api/time'
	});
};

const storeTime = () => {
	return (dispatch:Function, res:any) => {
		dispatch({type: ACTIONS.STORE_TIME, payload: res.time});
	}
};

export {requestTime};