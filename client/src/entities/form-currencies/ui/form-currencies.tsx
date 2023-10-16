import { ChangeEvent, FC, useCallback, useEffect, useLayoutEffect, useState } from 'react';

import { useLazyFetchCurrenciesRatesFromAPI } from '../api/get-currencies-rates-from-API';
import { getBasicIsoFromState } from '../model/selectors/get-basic-iso-from-state/get-basic-iso-from-state';
import { getCustomIsoFromState } from '../model/selectors/get-custom-iso-from-state/get-custom-iso-from-state';

import { getRatesFromState } from '../model/selectors/get-rates-from-state/get-rates-from-state';
import { getTimestampFromState } from '../model/selectors/get-timestamp-from-state/get-timestamp-from-state';
import { ratesActions } from '../model/slice/rates-slice';

import { RequestObj } from '../model/types/request-obj.interface';
import { RatesType, ResponseCurrency } from '../model/types/response-rates.type';

import { ListOfCurrencies } from '@/entities/list-of-currencies/ui/list-of-currencies';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { RequestObjDefaultParams } from '@/shared/lib/constants/request-obj-default-params';
import { InputCurrency } from '@/shared/ui/input-currency/input-currency';
import { Spinner } from '@/shared/ui/spinner/spinner';

export const FormCurrencies: FC = () => {
  const [getCurrenciesRates, { data, error, isLoading, isUninitialized }] =
    useLazyFetchCurrenciesRatesFromAPI();

  const ratesInState = useAppSelector(getRatesFromState);
  const basicIsoInState = useAppSelector(getBasicIsoFromState);
  const customIsoInState = useAppSelector(getCustomIsoFromState);
  const timestampInState = useAppSelector(getTimestampFromState);
  const [inputValue, setInputValue] = useState<RequestObj>({
    iso: RequestObjDefaultParams.ISO,
    value: RequestObjDefaultParams.VALUE,
    code: RequestObjDefaultParams.CODE,
  });

  const deSerializeRates = ratesInState && (new Map(JSON.parse(ratesInState)) as RatesType);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(ratesActions.changeState(data));
    }
  }, [data, dispatch]);

  useLayoutEffect(() => {
    const { abort, unsubscribe } = getCurrenciesRates(inputValue);
    return () => {
      if (!isUninitialized) {
        abort();
        unsubscribe();
      }
    };
  }, [inputValue, dispatch, getCurrenciesRates, isUninitialized]);

  const onChangeInput = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    const { value, id, dataset } = event.target;
    const { code } = dataset;
    console.log('event', dataset);

    if (value === '' || value.match(/^([0-9]{1,})?(.)?([0-9]{1,})?$/)) {
      const requestObj = {
        iso: id,
        value: parseFloat(value) || '',
        code: code ?? Number(code),
      };

      setInputValue(requestObj);
    }
  }, []);

  console.log('error', error);

  return (
    <div className="mx-auto max-w-7xl py-12 font-medium">
      {isLoading && <Spinner />}
      {/* {error && 'message' in error && (
        <div className="pointer-events-none cursor-default py-12 text-base font-medium">
          {error.message}
        </div>
      )} */}
      {deSerializeRates && (
        <div>
          <form>
            <fieldset>
              <legend>
                По курсу НБ РБ,{' '}
                {timestampInState
                  ? `данные из базы на ${new Date(timestampInState)}`
                  : 'данные из локальной базы'}
              </legend>
              {basicIsoInState.map((basicIso) => {
                if (deSerializeRates.has(basicIso)) {
                  const { code, iso, name, value } = deSerializeRates.get(
                    basicIso,
                  ) as ResponseCurrency;
                  return (
                    <InputCurrency
                      key={code}
                      name={name}
                      value={inputValue.iso !== basicIso ? value : inputValue.value}
                      iso={iso}
                      code={code}
                      // inputObj={inputValue}
                      onChange={onChangeInput}
                    />
                  );
                }
                return '';
              })}
              {customIsoInState.map((customIso) => {
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

          <ListOfCurrencies />
        </div>
      )}
    </div>
  );
};
