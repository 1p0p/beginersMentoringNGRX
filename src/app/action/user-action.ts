import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store"
import { IUser } from "../model/user.model";

export const USER_KEY = 'user'

export const addUserAction = createAction('[USER] add User', props<{newUser: IUser}>());
export const successAddUserAction = createAction('[USER] success Add  User', props<{user: IUser}>());

export const changeUserAction = createAction('[USER] change User', props<{changeUser: IUser}>());
export const successChangeUserAction = createAction('[USER] success change User', props<{user: IUser}>());

export const delUserAction = createAction('[USER] delete User', props<{deleteUser: IUser}>());
export const successDelUserAction = createAction('[USER] success del User', props<{user: IUser}>());

export const loadUserAction = createAction('[USER] load User'); 
export const successfulLoadAction = createAction('[USER] success download users', props<{payload: IUser[]}> ());
export const errorLoadAction = createAction('[USER] error download users');

//load
export interface loadState{
    users:IUser[];
    status: string;
}
export const initialState: loadState={
    users:[],
    status: 'waitLoad'
};

export const loadReducer = createReducer(
    initialState,
    on(loadUserAction, (state, action)=>({
        ...state,
        status: 'loadUserAction'
    })),
    on(successfulLoadAction, (state, { payload })=>({
        ...state,
        users: payload,
        status: 'successfulLoadAction'
    })),
    on(successAddUserAction, (state, {user})=>({
        ...state,
        users: [...state.users, user],
    })),
    on(successChangeUserAction, (state, {user})=>({
        ...state,
        users: [...state.users.map((currentUser)=>currentUser.id!==user.id ? currentUser:user)]
    })),
    on(successDelUserAction, (state, {user})=>({
        ...state,
        users: [...state.users.filter((currentUser)=>currentUser.id !== user.id)]
    })),
);

// count из файла index.ts
export  const usersFeatureSelector  //counterFeatureSelector
    = createFeatureSelector<loadState>(USER_KEY);

export const countSelector = createSelector(
    usersFeatureSelector,
        loadState => loadState.users
);  
