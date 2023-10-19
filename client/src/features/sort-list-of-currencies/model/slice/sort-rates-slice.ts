/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RatesStateFromServer } from '../types/rates-state.interface';

import { SortRatesState } from '@/shared/lib/types/sort-rates-state.interface';
import { SortByType } from '@/shared/lib/types/sort.type';

const initialState: SortRatesState = {
  sortRates: '',
  timestamp: null,
  sortState: {
    order: null,
    sortBy: null,
    orderPosition: 0,
    orders: ['asc', 'desc', null],
  },
};

export const sortRatesSlice = createSlice({
  name: 'sortRatesState',
  initialState,
  reducers: {
    changeSortState: (state, action: PayloadAction<RatesStateFromServer>) => {
      const { rates, sort, order, timestamp } = action.payload;

      if (rates && sort && (order || order === null)) {
        state.sortRates = rates;
        state.timestamp = timestamp;
        return;
      }

      state.sortRates = rates;
    },

    changeSortOrderState: (state, action: PayloadAction<SortByType>) => {
      const { orders, order, sortBy: prevSortBy } = state.sortState;

      if (action.payload === prevSortBy) {
        const curOrderPosition = orders.findIndex((curOrder) => curOrder === order);
        const curOrder = orders[(curOrderPosition + 1) % orders.length];

        state.sortState.sortBy = prevSortBy;
        state.sortState.order = curOrder;
        state.sortState.orderPosition = curOrderPosition;
        state.sortState.orders = orders;

        return;
      }
      state.sortState.sortBy = action.payload;
      state.sortState.order = 'asc';
      state.sortState.orderPosition = 0;
    },

    setupInitialState: (state) => {
      state.sortRates = '';
      state.timestamp = null;
      state.sortState = {
        sortBy: null,
        order: null,
        orderPosition: 0,
        orders: ['asc', 'desc', null],
      };
    },
  },
});

export const { reducer: sortRatesReducer } = sortRatesSlice;
export const { actions: sortRatesActions } = sortRatesSlice;
