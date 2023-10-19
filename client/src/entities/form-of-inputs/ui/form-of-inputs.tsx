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
  inputValue?: RequestObj;
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClickDeleteCurrency: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const FormOfInputs: FC<FormOfInputsProps> = (props) => {
  const {
    deSerializeRates,
    timestampInState,
    basicIsoInState,
    inputValue,
    customIsoInState,
    onChangeInput,
    handleClickDeleteCurrency,
  } = props;

  return (
    <form>
      <fieldset className="flex flex-col items-center">
        <legend className="wrap flex max-w-xs">
          По курсу НБ РБ,{' '}
          {timestampInState
            ? `данные из базы на ${new Date(timestampInState).toLocaleString()}`
            : 'данные из локальной базы'}
        </legend>
        {basicIsoInState.map((basicIso) => {
          if (deSerializeRates && deSerializeRates.has(basicIso)) {
            const { code, iso, name, value } = deSerializeRates.get(basicIso) as ResponseCurrency;
            return (
              <InputCurrency
                key={code}
                name={name}
                value={inputValue && inputValue.iso === iso ? inputValue.value : value}
                iso={iso}
                code={code}
                onChange={onChangeInput}
                handleClickDeleteCurrency={handleClickDeleteCurrency}
                isValid={!!(inputValue && inputValue.iso !== basicIso)}
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
                  value={!inputValue ? value : inputValue.value}
                  iso={iso}
                  code={code}
                  onChange={onChangeInput}
                  handleClickDeleteCurrency={handleClickDeleteCurrency}
                  custom
                  isValid={!!(inputValue && inputValue.iso !== customIso)}
                />
              );
            }
            return '';
          })}
      </fieldset>
    </form>
  );
};
