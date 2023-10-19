import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { BankApiModule } from 'src/bank-api/bank-api.module';
import { BankApiService } from 'src/bank-api/bank-api.service';
import { CurrencyDb, CurrencySchema } from 'src/schemas/currencies.schema';

import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CurrencyDb.name, schema: CurrencySchema }]),
    BankApiModule,
  ],
  controllers: [CurrenciesController],
  providers: [CurrenciesService, BankApiService],
})
export class CurrenciesModule {}
