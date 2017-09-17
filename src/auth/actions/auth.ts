import { Action } from '@ngrx/store';
import { User, Authenticate, RegisterForm } from '../models/user';

/** AUTH TYPES */

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const REGISTER = '[Register] Register';
export const REGISTER_SUCCESS = '[Register] Register Success';
export const REGISTER_FAILURE = '[Register] Register Failure';

/** LOGIN ACTIONS */

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: Authenticate) {
  }
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: { user: User }) {
  }
}

export class LoginFailure implements Action {
  readonly type = LOGIN_FAILURE;
  constructor(public payload: any) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

/** REGISTER ACTIONS */

export class Register implements Action {
  readonly type = REGISTER;
  constructor(public payload: RegisterForm) {
  }
}

export class RegisterSuccess implements Action {
  readonly type = REGISTER_SUCCESS;
  constructor(public payload: RegisterForm) {
  }
}

export class RegisterFailure implements Action {
  readonly type = REGISTER_FAILURE;
  constructor(public payload: any) {
  }
}


export type Actions =
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | Register
  | RegisterSuccess
  | RegisterFailure;
