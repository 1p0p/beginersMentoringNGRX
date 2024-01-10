import { createFeatureSelector, createSelector } from "@ngrx/store";
import { USER_KEY, loadState } from "./users.reducer";

// count из файла index.ts
export  const usersFeatureSelector  //counterFeatureSelector
    = createFeatureSelector<loadState>(USER_KEY);

export const countSelector = createSelector(
    usersFeatureSelector,
        loadState => loadState.users
);  