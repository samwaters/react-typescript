interface IAjaxHeaders {
	name: string,
	value: string
}

interface IAjaxParameters {
	data: any,
	errorCallback?: Function,
	headers?: Array<IAjaxHeaders>,
	loadAction?: any,
	method: string,
	nextAction: any,
	progressCallback?: Function,
	uploadProgressCallback?: Function,
	url: string;
}

interface XHREventTarget extends EventTarget {
	status:number;
	responseText:string;
}

interface XHRProgressEvent extends ProgressEvent {
	currentTarget:XHREventTarget;
}

interface AjaxResponse {
	headers: IAjaxHeaders;
	response: string;
}

const ajax = (params:IAjaxParameters) => {
	let payload: string;
	let isMultipart:boolean = false;
	if(params.headers) {
		isMultipart = params.headers.filter(
			h => h.name.toUpperCase() === 'CONTENT-TYPE' && h.value.toUpperCase() === 'MULTIPART/FORM-DATA'
		).length > 0;
	}
	// Leave the request data alone if this is multipart
	if(isMultipart) {
		payload = params.data;
	} else if(typeof params.data === 'string') {
		payload = JSON.stringify({data: params.data});
	} else {
		payload = JSON.stringify(params.data);
	}
	if(!params.headers) {
		params.headers = [];
	}
	return new Promise(
			(resolve: Function, reject: Function) => {
				let xhr = new XMLHttpRequest();
				xhr.addEventListener('error', (e:ErrorEvent) => reject(e));
				xhr.addEventListener('abort', (e:Event) => reject(e));
				xhr.addEventListener('load', (d:XHRProgressEvent) => {
					if(d.currentTarget) {
						d.currentTarget.status < 400 ? resolve({
							headers: xhr.getAllResponseHeaders().split('\r\n').map(header => {
								let h = header.split(': ');
								return {
									name: h[0],
									value: h[1]
								}
							}),
							response: d.currentTarget.responseText
						}) : reject(d)
					} else {
						reject(d);
					}
				});
				if(params.progressCallback) {
					xhr.addEventListener('progress', (e:ProgressEvent) => params.progressCallback(e));
				}
				if(params.uploadProgressCallback) {
					xhr.upload.addEventListener('progress', (e:ProgressEvent) => params.uploadProgressCallback(e));
				}
				xhr.open(params.method, params.url);
				for(let i = 0; i < params.headers.length; i++) {
					xhr.setRequestHeader(params.headers[i].name, params.headers[i].value);
				}
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.send(payload);
			}
	);
};

export {AjaxResponse, IAjaxHeaders, IAjaxParameters, ajax};