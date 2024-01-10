import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { USER_KEY, loadReducer, loadState } from './users.reducer';

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
