import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class GetCurrencyQueryDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => {
    if (value.trim() === '') return Number(value);
    return parseFloat(value);
  })
  value?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  code?: number;

  @IsOptional()
  @IsString()
  iso?: string;
}
