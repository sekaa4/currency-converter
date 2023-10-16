import { createSelector } from '@reduxjs/toolkit';

import { getRatesState } from '../get-rates-state/get-rates-state';

import { RatesState } from '@/shared/lib/types/rates-state.interface';

export const getTimestampFromState = createSelector(
  getRatesState,
  (ratesState: RatesState) => ratesState.timestamp,
);
