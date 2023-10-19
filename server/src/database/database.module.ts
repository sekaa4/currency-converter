import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BankApiModule } from 'src/bank-api/bank-api.module';
import { BankApiService } from 'src/bank-api/bank-api.service';
import { CurrencyDb, CurrencySchema } from 'src/schemas/currencies.schema';
import { Rates, RatesSchema } from 'src/schemas/rates.schema';

import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rates.name, schema: RatesSchema }]),
    MongooseModule.forFeature([{ name: CurrencyDb.name, schema: CurrencySchema }]),
    BankApiModule,
  ],

  controllers: [DatabaseController],
  providers: [DatabaseService, BankApiService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
