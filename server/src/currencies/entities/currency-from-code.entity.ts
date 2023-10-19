import { ApiProperty } from '@nestjs/swagger';

export class CurrencyFromCode {
  @ApiProperty({
    type: Number,
    example: 0,
  })
  value: number;

  @ApiProperty({
    type: String,
    example: 'EUR',
  })
  iso: string;

  @ApiProperty({
    type: 'integer',
    format: 'integer',
    example: 0,
  })
  code: number;

  @ApiProperty({
    type: String,
    format: 'date',
    example: '06.08.2023',
  })
  date: string;

  @ApiProperty({
    type: String,
    example: 0,
  })
  name: string;
}
