import {api} from './decorators';

export class Session {

	public static _sessions: any = {};

	private _sessionId: string = null;
	private _timeout: any = null;

	@api
	public static start(){
		return new Session().sessionId;
	}

	public constructor(){
		do {this._sessionId = Session.generateRandomId();} while(this._sessionId in Session._sessions);
		Session._sessions[this._sessionId] = this;
		this.setTimeout();
	}

	private static generateRandomId(){
		let pool = '0123456789abcdef';
		let result = '';
		for(let i=0; i<64; i++) result += pool.charAt(Math.floor(Math.random()*pool.length));
		return result;
	}

	public static load(sessionId: string){
		if(!(sessionId in Session._sessions)) throw new Error('Could not load session');
		let session = Session._sessions[sessionId];
		session.setTimeout();
		return session;
	}

	private setTimeout(){
		if(this._timeout!==null) clearTimeout(this._timeout);
		this._timeout = setTimeout(()=>{
			delete Session._sessions[this._sessionId];
		},1000*60);
	}

	public get sessionId(){
		return this._sessionId;
	}

}