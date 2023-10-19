import { createSelector } from '@reduxjs/toolkit';

import { getSortRatesState } from '../get-sort-rates-state/get-sort-rates-state';

import { SortRatesState } from '@/shared/lib/types/sort-rates-state.interface';

export const getRatesFromSortRatesState = createSelector(
  getSortRatesState,
  (sortRatesState: SortRatesState) => sortRatesState.sortRates,
);
