import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, now } from 'mongoose';

import { Currency } from 'src/currencies/entities/currency.entity';

export type RatesDocument = Rates & Document;

@Schema()
export class Rates {
  @Prop({ required: true, default: [] })
  @Prop()
  rates: Currency[];

  _id: mongoose.Types.ObjectId | string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const RatesSchema = SchemaFactory.createForClass(Rates);
