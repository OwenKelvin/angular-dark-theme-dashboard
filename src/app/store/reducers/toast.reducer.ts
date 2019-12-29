import { Action, createReducer, on } from '@ngrx/store';
import { showToast } from '../actions/toast.actions';
import { IToastState } from 'src/app/interfaces/toast-state.interface';

export const toastFeatureKey = 'toast';


export const initialState: IToastState = {
  showMessage: false,
  toastHeader: '',
  toastBody: '',
  toastTime: ''
};

const toastReducer = createReducer(
  initialState,
  on(showToast, (state, payload) => {
    return {
      ...state, ...payload
    };

  }),
);

export function reducer(state: IToastState | undefined, action: Action) {
  return toastReducer(state, action);
}
