import { createAction, props } from '@ngrx/store';
import { IToastState } from 'src/app/interfaces/toast-state.interface';

export const showToast = createAction(
  '[Toast] Show Toast Message',
  props<IToastState>()
);
