import {Action, createReducer, on} from '@ngrx/store';
import * as AuthActions from '../Actions/auth.actions';

export interface State{
    email: string;
    isLoggedIn:boolean;
    token:string;
}

export const initialState: State = {
    email: '',
    isLoggedIn: false,
    token: '',
}

const _authReducer = createReducer(
    initialState,
    on(AuthActions.authenticateUser, (state, {payload}) =>({
        email: payload.email,
        isLoggedIn: payload.isLoggedIn,
        token: payload.token
    })),
    on(AuthActions.logoutUser, (state) => ({
        email: '',
        token: '',
        isLoggedIn: false,
    }))
)

export function authReducer( state: State | undefined, action: Action){
    return _authReducer(state, action);
}