import { RatesType } from '@/shared/lib/types/response-rates.type';

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
