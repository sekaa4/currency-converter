/* eslint-disable new-cap */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BankApiService } from 'src/bank-api/bank-api.service';
import { Currency } from 'src/currencies/entities/currency.entity';
import { ListCurrenciesRates } from 'src/currencies/types/list-cyrrency-rates.interface';
import { Rates, RatesDocument } from 'src/schemas/rates.schema';

import * as dbLocal from './in-memory/db-local.json';

@Injectable()
export class DatabaseService {
  public id: string;

  public timestamp: number;

  constructor(
    @InjectModel(Rates.name) private ratesModel: Model<RatesDocument>,
    private bankApiService: BankApiService,
  ) {
    this.createNewRate();
  }

  async updateDataDb(data: ListCurrenciesRates) {
    try {
      const updateRate = await this.ratesModel.findByIdAndUpdate(
        this.id,
        { $set: data },
        { new: true },
      );

      if (updateRate) this.timestamp = updateRate.updatedAt.getTime();
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  async createNewRate() {
    try {
      const getDataFromBankApi =
        (await this.bankApiService.fetchCurrenciesDataBankApi()) as ListCurrenciesRates | null;

      if (getDataFromBankApi) {
        const newRate = new this.ratesModel(getDataFromBankApi);

        const result = await newRate.save();
        this.id = result.id;
        this.timestamp = result.createdAt.getTime();
      } else {
        const newRate = new this.ratesModel(dbLocal);
        const result = await newRate.save();
        this.id = result.id;
        this.timestamp = result.createdAt.getTime();
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getRatesFromDB() {
    try {
      const data = await this.ratesModel.findById(this.id);
      if (data) return data;
      return dbLocal.rates as unknown as Currency[] | undefined;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
}
