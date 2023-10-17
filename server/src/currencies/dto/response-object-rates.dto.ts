import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';

import { CurrencyFromCode } from '../entities/currency-from-code.entity';

import { OrderType, SortType } from '../types/sort-type.type';

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
    example: SortType[0],
  })
  sort: (typeof SortType)[number];

  @ApiProperty({
    type: String,
    nullable: true,
    example: OrderType[0],
  })
  order: (typeof OrderType)[number];
}
