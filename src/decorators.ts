export function api(target: Object, propertyKey: string){
	target[propertyKey].api = true;
}

export function inject(injections: string[]|string){
	return function (target: Object, propertyKey: string) {
		target[propertyKey].injections = injections.constructor === Array ? injections : [injections];
	}
}