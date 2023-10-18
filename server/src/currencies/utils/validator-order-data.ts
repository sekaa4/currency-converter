/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'validator-order-data', async: false })
export class ValidatorOrderData implements ValidatorConstraintInterface {
  validate(text: any, args: ValidationArguments) {
    console.log('text', text);
    console.log('args', args);
    return text === 'asc' || text === 'desc' || text === 'null';
  }

  defaultMessage(args: ValidationArguments) {
    return `($value) must be string as 'asc' or 'desc' or null`;
  }
}
