import {ajax, AjaxResponse, IAjaxParameters} from '../util/ajax';

function ajaxCall(params:IAjaxParameters) {
	return (dispatch: Function/*, getState*/) => {
		if(params.loadAction) {
			if (typeof params.loadAction === 'string') {
				dispatch({type: params.loadAction});
			} else {
				dispatch(params.loadAction);
			}
		}
		ajax(params).then(
			(res:AjaxResponse) => {
				let decoded:Object;
				try {
					decoded = JSON.parse(res.response);
				} catch(e) {
					dispatch({type: 'AJAX_ERROR', payload: {error: 'Could not decode response'}});
					return;
				}
				switch(typeof params.nextAction) {
					case 'object':
						params.nextAction.payload.data = decoded;
						dispatch(params.nextAction);
						break;
					case 'function':
						params.nextAction(dispatch, decoded);
						break;
					case 'string':
						dispatch({type: params.nextAction, payload: decoded});
						break;
					default:
						throw new Error('Unknown action type passed to ajaxCall');
				}
			}
		).catch((err:any) => {
			if(params.errorCallback) {
				params.errorCallback(dispatch, err);
			} else {
				dispatch({type: 'AJAX_ERROR', payload: err});
			}
		});
	}
}

export default ajaxCall;