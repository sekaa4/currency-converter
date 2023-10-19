import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CurrenciesDocument = CurrencyDb & Document;

@Schema({ timestamps: true })
export class CurrencyDb {
  @Prop({ required: true, type: Number })
  rate: number;

  @Prop({ required: true, type: String })
  iso: string;

  @Prop({ required: true, type: Number, unique: true })
  code: number;

  @Prop({ required: true, type: String })
  date: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Number })
  quantity: number;
}

export const CurrencySchema = SchemaFactory.createForClass(CurrencyDb);
