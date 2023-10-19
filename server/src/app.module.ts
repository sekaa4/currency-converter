import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankApiModule } from './bank-api/bank-api.module';
import configuration from './config/configuration';
import { MongooseConfigService } from './config/mongoose-config-service';
import { CurrenciesModule } from './currencies/currencies.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    CurrenciesModule,
    DatabaseModule,
    BankApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
