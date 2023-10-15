import { RatesType } from './response-rates.type';

import { BASIC_ISO } from '@/shared/lib/constants/basic-iso';

export interface RatesState {
  rates: RatesType;
  timestamp: number | null;
  basicISO: typeof BASIC_ISO;
  customISO: string[];
  sort: 'asc' | 'desc' | null;
}

export interface RatesStateFromServer {
  rates: RatesType;
  timestamp: number | null;
  sort: 'asc' | 'desc' | null;
}
