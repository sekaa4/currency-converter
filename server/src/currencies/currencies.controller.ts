import { Controller, Get, Query } from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { CurrenciesService } from './currencies.service';
import { GetCurrencyQueryDto } from './dto/get-currency-query.dto';
import { GetCurrencySortQueryDto } from './dto/get-currency-sort-query.dto';
import { CurrencyFromCode } from './entities/currency-from-code.entity';
import { ORDER_LIST, SORT_LIST } from './types/sort-type.type';

@ApiTags('Currencies')
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @ApiOperation({ summary: 'Get all currencies', description: 'Get all currencies' })
  @ApiQuery({ name: 'order', enum: ORDER_LIST, required: false })
  @ApiQuery({ name: 'sort', enum: SORT_LIST, required: false })
  @ApiOkResponse({
    description: 'The resources were returned successfully',
    type: [CurrencyFromCode],
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, currency is invalid',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something wrong in the server, try again later',
  })
  @Get()
  findAll(@Query() query: GetCurrencySortQueryDto) {
    // console.log('query', query);
    return this.currenciesService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get rates relative to a single currency code',
    description: 'Get rates relative to a single currency code',
  })
  @ApiParam({ name: 'code', type: 'number', format: 'integer', required: false })
  @ApiQuery({ name: 'iso', type: 'string', required: false })
  @ApiQuery({ name: 'value', type: 'string', allowEmptyValue: true, required: false })
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    type: [CurrencyFromCode],
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, currency is invalid',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something wrong in the server, try again later',
  })
  @Get('/code')
  findOne(@Query() query?: GetCurrencyQueryDto) {
    return this.currenciesService.findOne(query);
  }
}
