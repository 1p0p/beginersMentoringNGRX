import { createFeatureSelector, createSelector } from "@ngrx/store";
import { USER_KEY, LoadState } from "./users.reducer";

// count из файла index.ts
export  const usersFeatureSelector = createFeatureSelector<LoadState>(USER_KEY);

export const selectAllUsers = createSelector(
    usersFeatureSelector,
    loadState => loadState.users
);  

//usersFilterSelector который будет из стора вытягивать поле usersFilter -- как?
export const usersFilterSelector = createSelector(
    usersFeatureSelector,
    loadState => loadState.usersFilter
);

//Добавить новый селектор filteredUsers который будет включать в себя два других селектора (usersFilter и allUsers)
// и на выход будут даваться уже отфильтрованные данные, если фильтр пустой то возвращать всех пользователей
export const filteredUsers = createSelector(
    selectAllUsers,
    usersFilterSelector,
    (allUsers, usersFilter) => allUsers.filter((user)=> user.name.includes(usersFilter.name))
)