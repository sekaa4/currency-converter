/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { CreateCurrencyDto } from './dto/create-currency.dto';
import { GetCurrencyQueryDto } from './dto/get-currency-query.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Injectable()
export class CurrenciesService {
  constructor(private configService: ConfigService) {}

  create(createCurrencyDto: CreateCurrencyDto) {
    return 'This action adds a new currency';
  }

  async findAll() {
    const url = this.configService.getOrThrow<string>('BANK_API');
    const response = await fetch(url);
    const result = await response.json();
    return result;
  }

  async findOne(code: number, query: GetCurrencyQueryDto) {
    const { value } = query;
    const url = this.configService.getOrThrow<string>('BANK_API');
    const response1 = await fetch(`${url}?currencyCode=${code}`);
    const { rates } = await response1.json();
    // console.log('first', rates);
    const { rates: result1 } = await response1.json();

    const { rate, quantity } = result1[0];
    const convertToBLR = (rate / quantity) * value;

    const response2 = await fetch(`${url}`);
    const { rates: result2 } = await response2.json();
    //! ANY TYPE EXCLUDE
    const convertedResult = result2.reduce((acc: any, cur: any) => {
      const { rate, quantity, iso, code, date, name } = cur;
      const valueForOne = (convertToBLR / rate) * quantity;
      const newCurrency = { iso, code, date, name, value: valueForOne.toFixed(4) };
      acc.push(newCurrency);
      return acc;
    }, []);

    // console.log('result1', result1);
    // console.log('converted', convertedResult);

    return convertedResult;
  }
}
