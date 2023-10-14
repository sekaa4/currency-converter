/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RatesState } from '../types/rates-state.interface';
import { RatesType } from '../types/response-rates.type';

const initialState: RatesState = {
  rates: [],
};

export const ratesSlice = createSlice({
  name: 'ratesState',
  initialState,
  reducers: {
    changeRates: (state, action: PayloadAction<RatesType>) => {
      if (action.payload) {
        state.rates = [...action.payload];
      }
    },
    setupInitialState: (state) => {
      state.rates = [];
    },
  },
});

export const { reducer: ratesReducer } = ratesSlice;
export const { actions: ratesActions } = ratesSlice;
