import { ChangeEvent, FC, useCallback, useEffect, useLayoutEffect, useState } from 'react';

import { useLazyFetchCurrenciesRatesFromAPI } from '../api/get-currencies-rates-from-API';
import { getBasicIsoFromState } from '../model/selectors/get-basic-iso-from-state/get-basic-iso-from-state';
import { getCustomIsoFromState } from '../model/selectors/get-custom-iso-from-state/get-custom-iso-from-state';

import { getRatesFromState } from '../model/selectors/get-rates-from-state/get-rates-from-state';
import { getTimestampFromState } from '../model/selectors/get-timestamp-from-state/get-timestamp-from-state';
import { ratesActions } from '../model/slice/rates-slice';

import { DropMenuOfCurrencies } from '@/entities/drop-menu-of-currencies';
import { FormOfInputs } from '@/entities/form-of-inputs/ui/form-of-inputs';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { RequestObjDefaultParams } from '@/shared/lib/constants/request-obj-default-params';

import { RequestObj } from '@/shared/lib/types/request-obj.interface';
import { RatesType } from '@/shared/lib/types/response-rates.type';
import { Spinner } from '@/shared/ui/spinner/spinner';

// interface FormCurrenciesProps {
//   deSerializeRates: "" | RatesType;
// }

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
    <>
      {isLoading && <Spinner />}
      {/* {error && 'message' in error && (
        <div className="pointer-events-none cursor-default py-12 text-base font-medium">
          {error.message}
        </div>
      )} */}
      {deSerializeRates && (
        <>
          <FormOfInputs
            deSerializeRates={deSerializeRates}
            timestampInState={timestampInState}
            basicIsoInState={basicIsoInState}
            customIsoInState={customIsoInState}
            inputValue={inputValue}
            onChangeInput={onChangeInput}
          />

          <DropMenuOfCurrencies />
        </>
      )}
    </>
  );
};
