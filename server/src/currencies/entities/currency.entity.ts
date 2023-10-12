import { ApiProperty } from '@nestjs/swagger';

export class Currency {
  @ApiProperty({
    type: Number,
    example: 0,
  })
  rate: number;

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
    type: 'integer',
    format: 'integer',
    example: 0,
  })
  quantity: number;

  @ApiProperty({
    type: String,
    format: 'date',
    example: '06.08.2023',
  })
  date: Date;

  @ApiProperty({
    type: String,
    example: 0,
  })
  name: string;
}
