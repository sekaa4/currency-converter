import { Transform } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class GetCurrencyQueryDto {
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  value: number;

  @IsString()
  iso: string;
}
