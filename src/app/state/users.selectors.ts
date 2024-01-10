import { createFeatureSelector, createSelector } from "@ngrx/store";
import { USER_KEY, LoadState } from "./users.reducer";

// count из файла index.ts
export  const usersFeatureSelector = createFeatureSelector<LoadState>(USER_KEY);

export const countSelector = createSelector(
    usersFeatureSelector,
    loadState => loadState.users
);  