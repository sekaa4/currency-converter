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

      if (sort && (order || order === null)) {
        const orderPosition = state.sortState.orders.findIndex((curOrder) => curOrder === order);

        state = {
          sortRates: rates,
          sortState: { orders: state.sortState.orders, orderPosition, sortBy: sort, order },
          timestamp,
        };

        return state;
      }

      state = {
        sortRates: rates,
        sortState: state.sortState,
        timestamp,
      };

      return state;
    },

    changeSortOrderState: (state, action: PayloadAction<SortByType>) => {
      const prevSortBy = state.sortState.sortBy;
      const { orders, order } = state.sortState;

      if (action.payload === prevSortBy) {
        const curOrderPosition = orders.findIndex((curOrder) => curOrder === order);
        const curOrder = orders[(curOrderPosition + 1) % orders.length];

        state.sortState = {
          sortBy: prevSortBy,
          order: curOrder,
          orderPosition: curOrderPosition,
          orders,
        };
      } else {
        state.sortState = { sortBy: action.payload, order: orders[0], orderPosition: 0, orders };
      }
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
