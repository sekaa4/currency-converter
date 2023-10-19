import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ListCurrenciesRates } from 'src/currencies/types/list-cyrrency-rates.interface';

@Injectable()
export class BankApiService {
  private readonly url: string;

  constructor(private configService: ConfigService) {
    this.url = this.configService.getOrThrow<string>('BANK_API');
  }

  async fetchCurrenciesDataBankApi() {
    try {
      const responseListCurrencies = (await fetch(`${this.url}`).then((response) =>
        response.json(),
      )) as ListCurrenciesRates;

      const resultListCurrenciesBank = responseListCurrencies.rates;
      if (Array.isArray(resultListCurrenciesBank) && resultListCurrenciesBank.length === 0) {
        return null;
      }
      if (Array.isArray(resultListCurrenciesBank) && resultListCurrenciesBank.length !== 0) {
        return responseListCurrencies;
      }

      return null;
    } catch (error) {
      throw new InternalServerErrorException('Something wrong in the server, try again later');
    }
  }
}
