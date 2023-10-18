/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RatesStateFromServer } from '../types/rates-state.interface';

import { BASIC_ISO } from '@/shared/lib/constants/basic-iso';
import { RatesState } from '@/shared/lib/types/rates-state.interface';

const initialState: RatesState = {
  rates: '',
  timestamp: null,
  basicISO: BASIC_ISO,
  customISO: [],
  order: null,
  sort: null,
};

export const ratesSlice = createSlice({
  name: 'ratesState',
  initialState,
  reducers: {
    changeState: (state, action: PayloadAction<RatesStateFromServer>) => {
      if (action.payload) {
        state = { ...state, ...action.payload };
      }

      return state;
    },
    addCustomISO: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        state.customISO = [...state.customISO, action.payload];
      }
    },
    deleteCustomISO: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        const curCustomISO = state.customISO;
        const newCustomISO = curCustomISO.filter((customISO) => customISO !== action.payload);
        state.customISO = newCustomISO;
      }
    },
    setupInitialState: (state) => {
      state.rates = '';
      state.timestamp = null;
      state.basicISO = BASIC_ISO;
      state.customISO = [];
      state.sort = null;
    },
  },
});

export const { reducer: ratesReducer } = ratesSlice;
export const { actions: ratesActions } = ratesSlice;
