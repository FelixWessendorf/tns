import {UserGen} from './generated/userGen';
import {api, inject} from './decorators';
import {Session} from './session';

export class User extends UserGen {

	/**
	 * Adds two numbers
	 * @param session You have to be logged in to use this function
	 * @param a
	 * @param b
	 * @returns {number}
	 */
	@api
	@inject('session')
	public static add(session: Session, a: number, b: number): number {
		console.log(session);
		return a + b;
	}

	public static sub(a: number, b: number): number {
		return a - b;
	}

}