import { createSelector } from '@reduxjs/toolkit';

import { RatesState } from '../../types/rates-state.interface';
import { getRatesState } from '../get-rates-state/get-rates-state';

export const getRatesFromState = createSelector(
  getRatesState,
  (ratesState: RatesState) => ratesState.rates,
);
