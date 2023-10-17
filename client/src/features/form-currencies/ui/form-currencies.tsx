import { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from 'react';

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
import { isNumber } from '@/shared/lib/utils/is-number';
import { Spinner } from '@/shared/ui/spinner/spinner';

export const FormCurrencies: FC = () => {
  const [getCurrenciesRates, { data, error, isLoading, isUninitialized }] =
    useLazyFetchCurrenciesRatesFromAPI();
  const dispatch = useAppDispatch();
  const ratesInState = useAppSelector(getRatesFromState);
  const basicIsoInState = useAppSelector(getBasicIsoFromState);
  const customIsoInState = useAppSelector(getCustomIsoFromState);
  const timestampInState = useAppSelector(getTimestampFromState);
  const [inputValue, setInputValue] = useState<RequestObj>({
    iso: RequestObjDefaultParams.ISO,
    value: RequestObjDefaultParams.VALUE,
    code: RequestObjDefaultParams.CODE,
    isValid: true,
  });

  const deSerializeRates = ratesInState && (new Map(JSON.parse(ratesInState)) as RatesType);

  const isoOutOfDropMenu = useMemo(
    () => [...basicIsoInState, ...customIsoInState],
    [basicIsoInState, customIsoInState],
  );

  useEffect(() => {
    if (data) {
      dispatch(ratesActions.changeState(data));
    }
  }, [data, dispatch]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (inputValue.isValid && !ratesInState) {
      const { abort, unsubscribe } = getCurrenciesRates(inputValue);
      return () => {
        if (!isUninitialized) {
          abort();
          unsubscribe();
        }
      };
    }
  }, [inputValue, dispatch, getCurrenciesRates, isUninitialized, ratesInState]);

  const onChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value, id, dataset } = event.target;
    const { code } = dataset;

    const requestObj: RequestObj = {
      iso: id,
      value,
      code: code ?? Number(code),
      isValid: value === '' ? true : isNumber(value),
    };
    console.log('requestObj', requestObj);
    if (value === '' || value.match(/^([0-9]{1,})?(.)?([0-9]{1,})?$/)) {
      requestObj.value = parseFloat(value) || '';
      setInputValue(requestObj);
    }

    console.log('requestObj', requestObj);
  }, []);

  const handleClickDeleteCurrency = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const curIso = event.currentTarget.dataset.iso;
      console.log('curIso', curIso);
      if (curIso) dispatch(ratesActions.deleteCustomISO(curIso));
    },
    [dispatch],
  );

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
        <div className="relative h-full">
          <FormOfInputs
            deSerializeRates={deSerializeRates}
            timestampInState={timestampInState}
            basicIsoInState={basicIsoInState}
            customIsoInState={customIsoInState}
            inputValue={inputValue}
            onChangeInput={onChangeInput}
            handleClickDeleteCurrency={handleClickDeleteCurrency}
          />

          <DropMenuOfCurrencies
            deSerializeRates={deSerializeRates}
            isoOutOfDropMenu={isoOutOfDropMenu}
          />
        </div>
      )}
    </>
  );
};
