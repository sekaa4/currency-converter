import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { BankApiService } from 'src/bank-api/bank-api.service';
import { CONSTANTS } from 'src/constants/constants';

import { DatabaseService } from 'src/database/database.service';

import { GetCurrencyQueryDto } from './dto/get-currency-query.dto';
import { GetCurrencySortQueryDto } from './dto/get-currency-sort-query.dto';
import { ResponseObjectRates } from './dto/response-object-rates.dto';
import { CurrencyFromCode } from './entities/currency-from-code.entity';
import { Currency } from './entities/currency.entity';

import { ListCurrenciesRates } from './types/list-cyrrency-rates.interface';
import { OrderType, SortType } from './types/sort-type.type';

import * as dbLocal from '../database/in-memory/db-local.json';

@Injectable()
export class CurrenciesService {
  private readonly urlMongoDB?: string;

  constructor(
    private configService: ConfigService,
    private databaseService: DatabaseService,
    private bankApiService: BankApiService,
  ) {
    this.urlMongoDB = this.configService.get<string>('MongoDB_API');
  }

  async findAll(queryParams?: GetCurrencySortQueryDto) {
    try {
      const resultObject = await this.findOne(undefined, queryParams);

      return resultObject;
    } catch (error) {
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

    let timestamp: number | null = null;
    let resultListCurrencies: Currency[] = [];
    let resultCurrencies: Currency[] | null = code === CONSTANTS.codeBLR ? CONSTANTS.dataBLR : null;
    try {
      if (this.urlMongoDB) {
        const ratesInDB = await this.databaseService.getRatesFromDB();
        if (ratesInDB && 'rates' in ratesInDB) {
          const curTimestamp = Date.now();
          const timestampDB = ratesInDB.updatedAt.getTime();
          const isExpired = curTimestamp - timestampDB > CONSTANTS.expiredTime;

          if (isExpired) {
            const ratesFromBankApi =
              (await this.bankApiService.fetchCurrenciesDataBankApi()) as ListCurrenciesRates | null;
            if (ratesFromBankApi && ratesFromBankApi.rates) {
              resultListCurrencies = [...ratesFromBankApi.rates];
              await this.databaseService.updateDataDb(ratesFromBankApi);
              timestamp = curTimestamp;
            } else {
              resultListCurrencies = [...ratesInDB.rates];
              timestamp = timestampDB;
            }
          } else {
            resultListCurrencies = [...ratesInDB.rates];
            timestamp = timestampDB;
          }
        } else if (ratesInDB) {
          timestamp = null;
          resultListCurrencies = [...ratesInDB];
        }

        if (code) {
          const currency = resultListCurrencies.find(({ code: curCode }) => curCode === code);
          if (currency) {
            resultCurrencies = [currency];
          }
        }
      } else {
        timestamp = null;

        if (!resultCurrencies) {
          [resultCurrencies, resultListCurrencies] = this.applyLocalDB(code) as Currency[][];
        }

        resultListCurrencies = (await this.applyLocalDB()) as Currency[];
      }

      if (resultCurrencies) {
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
      }
      throw new InternalServerErrorException('Something wrong in the server, try again later');
    } catch (error) {
      if (error instanceof InternalServerErrorException || error instanceof BadRequestException)
        throw error;
      throw new InternalServerErrorException('Something wrong in the server, try again later');
    }
  }

  applyLocalDB(code?: number) {
    if (code) {
      const resultListCurrencies = [...dbLocal.rates] as unknown as Currency[];
      const resultSearchCurrency = resultListCurrencies.find((currency) => currency.code === code);

      if (resultSearchCurrency) {
        const resultCurrencies = [resultSearchCurrency];
        return [resultCurrencies, resultListCurrencies];
      }

      throw new BadRequestException('Bad Request, currency is invalid');
    } else {
      const resultListCurrencies = dbLocal.rates as unknown as Currency[];

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
