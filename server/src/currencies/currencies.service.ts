/* eslint-disable @typescript-eslint/no-unused-expressions */
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { CONSTANTS } from 'src/constants/constants';

import { GetCurrencyQueryDto } from './dto/get-currency-query.dto';
import { GetCurrencySortQueryDto } from './dto/get-currency-sort-query.dto';
import { ResponseObjectRates } from './dto/response-object-rates.dto';
import { CurrencyFromCode } from './entities/currency-from-code.entity';
import { Currency } from './entities/currency.entity';
import { ListCurrenciesRates } from './types/list-cyrrency-rates.interface';

import { OrderType, SortType } from './types/sort-type.type';

import * as localDB from '../database/in-memory/db-local.json';

@Injectable()
export class CurrenciesService {
  private readonly url: string;

  private readonly urlMongoDB?: string;

  constructor(private configService: ConfigService) {
    this.url = this.configService.getOrThrow<string>('BANK_API');
    this.urlMongoDB = this.configService.get<string>('MongoDB_API');
  }

  async findAll(queryParams?: GetCurrencySortQueryDto) {
    try {
      // const { codeUSD, dataUSD } = CONSTANTS;

      // if (order && sort) {
      //   const listOfCurrenciesWithoutSort = await this.findOne(codeUSD, dataUSD);
      // }

      const resultObject = await this.findOne(undefined, queryParams);

      return resultObject;
    } catch (error) {
      console.log('error', error);
      if (error instanceof InternalServerErrorException || error instanceof BadRequestException)
        throw error;
      throw new InternalServerErrorException('Something wrong in the server, try again later');
    }
  }

  async findOne(requestQuery?: GetCurrencyQueryDto, querySortParams?: GetCurrencySortQueryDto) {
    const { codeUSD, dataUSD } = CONSTANTS;

    const value =
      requestQuery?.value || requestQuery?.value === 0 ? requestQuery?.value : dataUSD.value;
    const code = requestQuery?.code ? requestQuery?.code : codeUSD;

    let timestamp: number | null = Date.now();
    let resultListCurrencies: Currency[] = [];
    let resultCurrencies: Currency[] | null = code === CONSTANTS.codeBLR ? CONSTANTS.dataBLR : null;
    try {
      if (this.urlMongoDB) {
        if (timestamp) {
          resultListCurrencies = localDB.rates as unknown as Currency[];
          resultCurrencies =
            resultCurrencies ?? this.searchDataCurrencyFromCode(resultListCurrencies, code);
        } else {
          if (!resultCurrencies) {
            [resultCurrencies, resultListCurrencies] = (await this.fetchAllCurrenciesData(
              code,
            )) as Currency[][];
          }
          resultListCurrencies = (await this.fetchAllCurrenciesData()) as Currency[];
        }
      } else {
        timestamp = null;

        if (!resultCurrencies) {
          [resultCurrencies, resultListCurrencies] = (await this.applyLocalDB(
            code,
          )) as Currency[][];
        }
        resultListCurrencies = (await this.applyLocalDB()) as Currency[];
      }
      const convertedResult = this.convertCurrencies(
        resultCurrencies,
        resultListCurrencies,
        value,
        querySortParams,
      );

      const serializedConvertedResult = JSON.stringify(Array.from(convertedResult));

      const responseObject: ResponseObjectRates = {
        rates: serializedConvertedResult,
        timestamp,
        sort: querySortParams?.sort ?? null,
        order: querySortParams?.order ?? null,
      };

      return responseObject;
    } catch (error) {
      if (error instanceof InternalServerErrorException || error instanceof BadRequestException)
        throw error;
      throw new InternalServerErrorException('Something wrong in the server, try again later');
    }
  }

  async fetchAllCurrenciesData(code?: number) {
    try {
      if (code) {
        const [responseCurrency, responseListCurrencies] = (await Promise.all([
          fetch(`${this.url}?currencyCode=${code}`).then((response) => response.json()),
          fetch(`${this.url}`).then((response) => response.json()),
        ])) as ListCurrenciesRates[];
        const resultCurrenciesBank = responseCurrency.rates;
        const resultListCurrenciesBank = responseListCurrencies.rates;
        if (
          Array.isArray(resultCurrenciesBank) &&
          Array.isArray(resultListCurrenciesBank) &&
          resultCurrenciesBank.length === 0 &&
          resultListCurrenciesBank.length === 0
        ) {
          return await this.applyLocalDB(code);
        }
        if (
          Array.isArray(resultCurrenciesBank) &&
          Array.isArray(resultListCurrenciesBank) &&
          resultCurrenciesBank.length !== 0 &&
          resultListCurrenciesBank.length !== 0
        ) {
          return [resultCurrenciesBank, resultListCurrenciesBank];
        }
        throw new InternalServerErrorException('Something wrong in the server, try again later');
      } else {
        const responseListCurrencies = (await fetch(`${this.url}`).then((response) =>
          response.json(),
        )) as ListCurrenciesRates;

        const resultListCurrenciesBank = responseListCurrencies.rates;
        if (Array.isArray(resultListCurrenciesBank) && resultListCurrenciesBank.length === 0) {
          return await this.applyLocalDB();
        }
        if (Array.isArray(resultListCurrenciesBank) && resultListCurrenciesBank.length !== 0) {
          return resultListCurrenciesBank;
        }
        throw new InternalServerErrorException('Something wrong in the server, try again later');
      }
    } catch (error) {
      throw new InternalServerErrorException('Something wrong in the server, try again later');
    }
  }

  async applyLocalDB(code?: number) {
    if (code) {
      const resultListCurrencies = [...localDB.rates] as unknown as Currency[];
      console.log('code', resultListCurrencies);
      const resultSearchCurrency = resultListCurrencies.find((currency) => currency.code === code);
      console.log('resultSearchCurrency', resultSearchCurrency);

      if (resultSearchCurrency) {
        const resultCurrencies = [resultSearchCurrency];
        return [resultCurrencies, resultListCurrencies];
      }

      throw new BadRequestException('Bad Request, currency is invalid');
    } else {
      const resultListCurrencies = localDB.rates as unknown as Currency[];

      return resultListCurrencies;
    }
  }

  convertCurrencies(
    currencies: Currency[],
    currenciesList: Currency[],
    value: number,
    querySortParams?: GetCurrencySortQueryDto,
  ) {
    if (
      Array.isArray(currencies) &&
      Array.isArray(currenciesList) &&
      currencies.length > 0 &&
      currenciesList.length > 0
    ) {
      const currenciesMap = new Map<string, CurrencyFromCode>();

      const { rate, quantity } = currencies[0];
      const convertToBLR = (rate / quantity) * value;
      const { iso: blrIso, code: blrCode, date: blrDate, name: blrName } = CONSTANTS.dataBLR[0];
      const currencyBLR: CurrencyFromCode = {
        iso: blrIso,
        code: blrCode,
        date: blrDate.toString(),
        name: blrName,
        value: Number(convertToBLR.toFixed(4)),
      };

      const indexUSD = currenciesList.findIndex(({ code }) => code === CONSTANTS.codeUSD);

      const usdCurrency = [...currenciesList].splice(indexUSD, 1);
      const updateCurrenciesList = [...usdCurrency, currencyBLR, ...currenciesList];

      const currenciesFromCode = updateCurrenciesList.reduce(
        (acc: CurrencyFromCode[], cur: Currency) => {
          if (cur && cur.code === currencyBLR.code) {
            acc.push(currencyBLR);
            return acc;
          }
          if (cur) {
            const {
              rate: currencyRate,
              quantity: currencyQuantity,
              iso: currencyIso,
              code: currencyCode,
              date: currencyDate,
              name: currencyName,
            } = cur;
            const valueForOne = (convertToBLR / currencyRate) * currencyQuantity;
            const parsedValueToNumber = Number(valueForOne.toFixed(4));
            const newCurrency: CurrencyFromCode = {
              iso: currencyIso,
              code: currencyCode,
              date: currencyDate,
              name: currencyName,
              value: parsedValueToNumber,
            };
            acc.push(newCurrency);

            return acc;
          }

          return acc;
        },
        [],
      );

      let convertedResult: CurrencyFromCode[] = [...currenciesFromCode];

      if (querySortParams) {
        const { order, sort } = querySortParams;
        console.log(order, sort);
        convertedResult =
          sort && order && order !== 'null'
            ? this.sortCurrenciesByOrder(convertedResult, sort as Exclude<SortType, 'null'>, order)
            : convertedResult;
      }

      return convertedResult.reduce((acc: Map<string, CurrencyFromCode>, cur: CurrencyFromCode) => {
        if (cur) {
          const { iso: currencyIso } = cur;

          acc.set(currencyIso, cur);
          return acc;
        }
        return acc;
      }, currenciesMap);
    }

    throw new BadRequestException('Bad Request, currency is invalid');
  }

  searchDataCurrencyFromCode(currenciesList: Currency[], code: number) {
    const resultSearchCurrency = currenciesList.find((currency) => currency.code === code);
    if (resultSearchCurrency) {
      return [resultSearchCurrency];
    }
    throw new BadRequestException('Bad Request, currency is invalid');
  }

  sortCurrenciesByOrder(
    updateCurrenciesList: CurrencyFromCode[],
    sort: Exclude<SortType, 'null'>,
    order: Exclude<OrderType, 'null'>,
  ): CurrencyFromCode[] {
    return [...updateCurrenciesList].sort((a, b) => {
      if (a[sort] === null) return 1;
      if (b[sort] === null) return -1;
      if (a[sort] === null && b[sort] === null) return 0;
      return (
        a[sort].toString().localeCompare(b[sort].toString(), 'en', {
          numeric: true,
        }) * (order === 'asc' ? 1 : -1)
      );
    });
  }
}
