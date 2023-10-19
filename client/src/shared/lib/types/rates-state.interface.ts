import { OrderType, SortByType } from './sort.type';

import { BASIC_ISO } from '@/shared/lib/constants/basic-iso';

export interface RatesState {
  rates: string;
  timestamp: number | null;
  basicISO: typeof BASIC_ISO;
  customISO: string[];
  order: OrderType;
  sort: SortByType;
}
