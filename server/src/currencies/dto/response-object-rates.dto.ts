import { ApiProperty } from '@nestjs/swagger';

import { CurrencyFromCode } from '../entities/currency-from-code.entity';

import { SortType } from '../types/sort-type.type';

export class ResponseObjectRates {
  @ApiProperty({
    type: [CurrencyFromCode],
  })
  rates: CurrencyFromCode[];

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
    enum: SortType,
  })
  sort: (typeof SortType)[number];
}
