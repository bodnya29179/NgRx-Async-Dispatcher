import { createAction, props } from '@ngrx/store';

export const loadData = createAction('[Data] Load data');

export const dataLoaded = createAction('[Data] Data loaded', props<{ data: number[] }>());
