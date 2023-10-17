import { SortState } from './sort.type';

export interface SortRatesState {
  sortRates: string;
  timestamp: number | null;
  sortState: SortState;
}
