/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'validator-sort-data', async: false })
export class ValidatorSortData implements ValidatorConstraintInterface {
  validate(text: any, args: ValidationArguments) {
    return text === 'value' || text === 'name' || text === 'null';
  }

  defaultMessage(args: ValidationArguments) {
    return `($value) must be string as 'value' or 'name' or null`;
  }
}
