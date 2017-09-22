interface Headers {
    name:string,
    value:string
}

const ajax = (url:string, method:string, data:any, headers:Array<Headers> = []) => {
    let payload:string;
    if(typeof data === 'string') {
        payload = JSON.stringify({data: data});
    } else {
        payload = JSON.stringify(data);
    }
    if(!Array.isArray(headers)) {
        headers = [];
    }
    return new Promise(
        (resolve:Function, reject:Function) => {
            let xhr = new XMLHttpRequest();
            xhr.addEventListener('error', e => reject(e));
            xhr.addEventListener('abort', e => reject(e));
            xhr.addEventListener('load', (d:any) => resolve(d.currentTarget.responseText));
            xhr.open(method, url);
            for(let i=0; i<headers.length; i++) {
                xhr.setRequestHeader(headers[i].name, headers[i].value);
            }
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(payload);
        }
    );
};

export default ajax;