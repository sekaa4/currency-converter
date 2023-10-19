import { OrderType, SortByType } from './sort.type';

export interface RequestSortObj {
  order: OrderType;
  sort: SortByType;
}
