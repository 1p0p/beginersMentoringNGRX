import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { loadReducer, loadState, USER_KEY } from '../action/user-action';

export interface State {
  /*
   стотояние нашего хранилища(State), будет иметь узел -count
   */
   [USER_KEY]: loadState;
}

export const reducers: ActionReducerMap<State> = {
  /* 
  редусер ответственный за состояние counter
  */
  [USER_KEY]: loadReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
