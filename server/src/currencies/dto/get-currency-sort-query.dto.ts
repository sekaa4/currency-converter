import { IsOptional, Validate } from 'class-validator';

import { OrderType, SortType } from '../types/sort-type.type';
import { ValidatorOrderData } from '../utils/validator-order-data';
import { ValidatorSortData } from '../utils/validator-sort-data';

export class GetCurrencySortQueryDto {
  @IsOptional()
  @Validate(ValidatorSortData)
  sort: SortType;

  @IsOptional()
  @Validate(ValidatorOrderData)
  order: OrderType;
}
