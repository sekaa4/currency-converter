import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { CurrenciesService } from './currencies.service';
import { GetCurrencyQueryDto } from './dto/get-currency-query.dto';
import { Currency } from './entities/currency.entity';

@ApiTags('Currencies')
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @ApiOperation({ summary: 'Get all currencies', description: 'Get all currencies' })
  @ApiOkResponse({
    description: 'The resources were returned successfully',
    type: [Currency],
  })
  @Get()
  findAll() {
    return this.currenciesService.findAll();
  }

  @ApiOperation({
    summary: 'Get rates relative to a single currency code',
    description: 'Get rates relative to a single currency code',
  })
  @ApiParam({ name: 'code', type: 'number', format: 'integer' })
  @ApiQuery({ name: 'iso', type: 'string' })
  @ApiQuery({ name: 'value', type: 'string', allowEmptyValue: true })
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    type: [Currency],
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, currency is invalid',
  })
  @ApiNotFoundResponse({
    description: 'Currency not found',
  })
  @Get(':code')
  findOne(@Param('code', ParseIntPipe) code: number, @Query() query: GetCurrencyQueryDto) {
    console.log('query', query);
    return this.currenciesService.findOne(code, query);
  }
}
