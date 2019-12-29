import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { InjectionToken } from '@angular/core';

import * as fromToast from './toast.reducer';
import { IToastState } from 'src/app/interfaces/toast-state.interface';


export interface AppState {
  [fromToast.toastFeatureKey]: IToastState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromToast.toastFeatureKey]: fromToast.reducer,
};

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('Registered Reducers');
export const reducerProvider = { provide: REDUCER_TOKEN, useValue: reducers };

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
