import { RatesType } from '@/shared/lib/types/response-rates.type';
import { OrderType, SortByType } from '@/shared/lib/types/sort.type';

export interface RatesStateFromServer {
  rates: string;
  timestamp: number | null;
  order: OrderType;
  sort: SortByType;
}

export interface DeSerializeRatesStateFromServer {
  rates: RatesType;
  timestamp: number | null;
  sort: SortByType;
  order: OrderType;
}
