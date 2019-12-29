import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { InjectionToken } from '@angular/core';

import { IToastState } from 'src/app/interfaces/toast-state.interface';
import { IMenuState } from 'src/app/interfaces/menu-state.interface';
import * as fromToast from './toast.reducer';
import * as fromMenuToggle from './menu-toggle.reducer';



export interface AppState {
  [fromToast.toastFeatureKey]: IToastState;
  [fromMenuToggle.menuToggleFeatureKey]: IMenuState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromToast.toastFeatureKey]: fromToast.reducer,
  [fromMenuToggle.menuToggleFeatureKey]: fromMenuToggle.reducer,
};

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('Registered Reducers');
export const reducerProvider = { provide: REDUCER_TOKEN, useValue: reducers };

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
