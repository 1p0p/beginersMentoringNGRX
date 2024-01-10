import { createAction, props } from "@ngrx/store"
import { IUser } from "../model/user.model";

export const addUserAction = createAction('[USER] add User', props<{newUser: IUser}>());
export const successAddUserAction = createAction('[USER] success Add  User', props<{user: IUser}>());

export const changeUserAction = createAction('[USER] change User', props<{changeUser: IUser}>());
export const successChangeUserAction = createAction('[USER] success change User', props<{user: IUser}>());

export const delUserAction = createAction('[USER] delete User', props<{deleteUser: IUser}>());
export const successDelUserAction = createAction('[USER] success del User', props<{user: IUser}>());

export const loadUserAction = createAction('[USER] load User'); 
export const successfulLoadAction = createAction('[USER] success download users', props<{payload: IUser[]}> ());
export const errorLoadAction = createAction('[USER] error download users');
