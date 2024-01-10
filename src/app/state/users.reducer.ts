import { createReducer, on } from "@ngrx/store";
import { IUser } from "../model/user.model";
import { loadUserAction, successAddUserAction, successChangeUserAction, successDelUserAction, successfulLoadAction } from "./users.actions";

export const USER_KEY = 'user'

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
