import { Action, createReducer, on } from '@ngrx/store';
import { dataLoaded } from './data.actions';

interface DataState {
  data: number[];
}

const initialState: DataState = {
  data: undefined,
};

const reducer = createReducer(
  initialState,
  on(dataLoaded, (state, action) => {
    return {
      ...state,
      data: action.data,
    };
  }),
);

export function dataReducer(state: DataState, action: Action): DataState {
  return reducer(state, action);
}
