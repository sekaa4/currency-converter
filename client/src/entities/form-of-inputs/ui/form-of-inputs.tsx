import { ChangeEvent, FC } from 'react';

import { BASIC_ISO } from '@/shared/lib/constants/basic-iso';
import { RequestObj } from '@/shared/lib/types/request-obj.interface';
import { RatesType, ResponseCurrency } from '@/shared/lib/types/response-rates.type';
import { InputCurrency } from '@/shared/ui/input-currency/input-currency';

interface FormOfInputsProps {
  deSerializeRates: RatesType | '';
  timestampInState: number | null;
  basicIsoInState: typeof BASIC_ISO;
  customIsoInState: string[];
  inputValue: RequestObj;
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const FormOfInputs: FC<FormOfInputsProps> = (props) => {
  const {
    deSerializeRates,
    timestampInState,
    basicIsoInState,
    inputValue,
    customIsoInState,
    onChangeInput,
  } = props;

  return (
    <form>
      <fieldset className="flex flex-col items-center">
        <legend>
          По курсу НБ РБ,{' '}
          {timestampInState
            ? `данные из базы на ${new Date(timestampInState)}`
            : 'данные из локальной базы'}
        </legend>
        {basicIsoInState.map((basicIso) => {
          if (deSerializeRates && deSerializeRates.has(basicIso)) {
            const { code, iso, name, value } = deSerializeRates.get(basicIso) as ResponseCurrency;
            return (
              <InputCurrency
                key={code}
                name={name}
                value={inputValue.iso !== basicIso ? value : inputValue.value}
                iso={iso}
                code={code}
                onChange={onChangeInput}
              />
            );
          }
          return '';
        })}
        {deSerializeRates &&
          customIsoInState.map((customIso) => {
            if (deSerializeRates.has(customIso)) {
              const { code, iso, name, value } = deSerializeRates.get(
                customIso,
              ) as ResponseCurrency;
              return (
                <InputCurrency
                  key={code}
                  name={name}
                  value={value}
                  iso={iso}
                  code={code}
                  onChange={onChangeInput}
                />
              );
            }
            return '';
          })}
      </fieldset>
    </form>
  );
};
