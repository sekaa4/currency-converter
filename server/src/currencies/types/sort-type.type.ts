/* eslint-disable @typescript-eslint/naming-convention */
export const Order = ['asc', 'desc', 'null'] as const;
export const Sort = ['value', 'name', 'null'] as const;

export enum ORDER_LIST {
  ASC = 'asc',
  DESC = 'desc',
  NULL = 'null',
}

export enum SORT_LIST {
  VALUE = 'value',
  NAME = 'name',
  NULL = 'null',
}

export type OrderType = (typeof Order)[number];
export type SortType = (typeof Sort)[number];
export type ResponseOrderType = 'asc' | 'desc' | 'null' | null;
export type ResponseSortType = 'value' | 'name' | 'null' | null;
