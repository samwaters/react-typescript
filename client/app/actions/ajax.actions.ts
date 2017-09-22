import ajax from '../util/ajax';

interface Headers {
    name:string,
    value:string
}

export function ajaxCall(url:string, method:string, data:any, nextAction?:any, loadAction:string=null) {
    return (dispatch:Function/*, getState*/) => {
        //let state = getState();
        let headers:Array<Headers> = [];
        /*if(state.authReducer.token) {
            headers.push({name:'token', value:state.authReducer.token});
        }*/
        if(loadAction) {
			dispatch({type: loadAction});
        }
        ajax(url, method, data, headers).then(
            (res:any) => {
                let decoded:Object;
                try {
                    decoded = JSON.parse(res);
                } catch(e) {
                    dispatch({type:'AJAX_ERROR', payload: {error: 'Could not decode response'}});
                    return;
                }
                switch(typeof nextAction) {
                    case 'object':
                        nextAction.payload.data = decoded;
                        dispatch(nextAction);
                        break;
                    case 'function':
                        nextAction(dispatch, decoded);
                        break;
                    case 'string':
                        dispatch({type: nextAction, payload: decoded});
                        break;
                    default:
                        throw new Error('Unknown action type passed to ajaxCall');
                }
            },
            (err:any) => dispatch({type: nextAction, payload: err})
        );
    }
}
