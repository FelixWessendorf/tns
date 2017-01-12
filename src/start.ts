import {Session} from './session';

interface Request {
	module: string,
	action: string,
	session?: string,
	parameters?: any[]
}

interface Response {
	result: any,
	errors: any[]
}

let port = 1337;

require('http').createServer((httpRequest,httpResponse)=>{
	httpRequest.on('data',(buffer)=>{

		let response: Response = {result: null, errors: []};

		try {

			(()=>{

				let request: Request = JSON.parse(buffer.toString());

				let module = require('./' + request.module)[request.module.charAt(0).toUpperCase()+request.module.slice(1)];
				let action = module[request.action];

				if(!('api' in action)) throw new Error('This is not callable');

				let injections = [];
				if('injections' in action) action.injections.forEach((injection: string)=>{
					switch (injection){
						case 'session': injections.push(Session.load(request.session)); break;
					}
				});

				response.result = action.apply(module, injections.concat(request.parameters));

			})();

		} catch(errors) {

			response.errors = response.errors.concat(errors.constructor === Array ? errors : [errors]);

		}

		response.errors = response.errors.map((error) => {
			return {
				message: error.message
			}
		});

		httpResponse.end(JSON.stringify(response));

	});
}).listen(port,()=>{
	console.log('Server is listing on port ' + port + '.');
});