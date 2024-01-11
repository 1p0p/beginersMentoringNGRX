import { createReducer, on } from "@ngrx/store";
import { IUser } from "../model/user.model";
import { loadUserAction, successAddUserAction, successChangeUserAction, successDeleteUserAction, loadUsersSuccess, setUsersFilter } from "./users.actions";

export const USER_KEY = 'user'

export interface LoadState {
    users:IUser[];
    status: string;
    usersFilter: {name: string};
}
export const initialState: LoadState = {
    users:[],
    status: 'waitLoad',
    usersFilter: {name: ''} //usersFilter: {name: string} --?
};

export const loadReducer = createReducer(
    initialState,
    on(loadUserAction, (state, action) => ({
        ...state,
        status: 'loadUserAction'
    })),
    on(loadUsersSuccess, (state, { payload }) => ({
        ...state,
        users: payload,
        status: 'successfulLoadAction'
    })),
    on(successAddUserAction, (state, {user}) => ({
        ...state,
        users: [...state.users, user],
    })),
    on(successChangeUserAction, (state, {user})=> ({
        ...state,
        users: [...state.users.map((currentUser) => currentUser.id!==user.id ? currentUser:user)]
    })),
    on(successDeleteUserAction, (state, {user}) => ({
        ...state,
        users: [...state.users.filter((currentUser) => currentUser.id !== user.id)]
    })),
    on(setUsersFilter, (state, {nameFilter})=>({
        ...state,
        usersFilter: {name: nameFilter}
    }))
);
