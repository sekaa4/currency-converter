import { RatesType } from './response-rates.type';

import { BASIC_ISO } from '@/shared/lib/constants/basic-iso';

export interface RatesState {
  rates: string;
  timestamp: number | null;
  basicISO: typeof BASIC_ISO;
  customISO: string[];
  sort: 'asc' | 'desc' | null;
}

export interface RatesStateFromServer {
  rates: string;
  timestamp: number | null;
  sort: 'asc' | 'desc' | null;
}

export interface DeSerializeRatesStateFromServer {
  rates: RatesType;
  timestamp: number | null;
  sort: 'asc' | 'desc' | null;
}
