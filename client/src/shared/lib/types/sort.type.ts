export type OrderType = 'asc' | 'desc' | null;
export type SortByType = 'name' | 'value' | null;

export interface SortState {
  order: OrderType;
  sortBy: SortByType;
  orderPosition: number;
  orders: OrderType[];
}
