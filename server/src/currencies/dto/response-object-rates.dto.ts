import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';

import { CurrencyFromCode } from '../entities/currency-from-code.entity';

import { Order, ResponseOrderType, ResponseSortType, Sort } from '../types/sort-type.type';

@ApiExtraModels(CurrencyFromCode)
export class ResponseObjectRates {
  @ApiProperty({
    type: Map,
    additionalProperties: {
      $ref: getSchemaPath(CurrencyFromCode),
    },
  })
  rates: string;

  @ApiProperty({
    nullable: true,
    type: 'integer',
    example: 12341567,
  })
  timestamp: number | null;

  @ApiProperty({
    type: String,
    nullable: true,
    example: Sort[0],
  })
  sort: ResponseSortType;

  @ApiProperty({
    type: String,
    nullable: true,
    example: Order[0],
  })
  order: ResponseOrderType;
}
