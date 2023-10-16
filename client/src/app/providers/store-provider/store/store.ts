/* eslint-disable no-param-reassign */
import { combineReducers, AnyAction, configureStore, Reducer } from '@reduxjs/toolkit';

import { ratesReducer } from '@/features/form-currencies';
import { rtkAPI } from '@/shared/api/rtk-Api';

const combinedReducer = combineReducers({
  [rtkAPI.reducerPath]: rtkAPI.reducer,
  ratesState: ratesReducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'RESET') {
    state = {} as RootState;
  }
  return combinedReducer(state, action);
};

export const createReduxStore = (initialState?: RootState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkAPI.middleware),
  });

export type RootState = ReturnType<typeof combinedReducer>;
export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore['dispatch'];
