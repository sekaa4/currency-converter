import { ChangeEvent, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useLazyFetchCurrenciesRatesFromAPI } from '../api/get-currencies-rates-from-API';
import { getBasicIsoFromState } from '../model/selectors/get-basic-iso-from-state/get-basic-iso-from-state';
import { getCustomIsoFromState } from '../model/selectors/get-custom-iso-from-state/get-custom-iso-from-state';

import { getRatesFromState } from '../model/selectors/get-rates-from-state/get-rates-from-state';
import { getTimestampFromState } from '../model/selectors/get-timestamp-from-state/get-timestamp-from-state';
import { ratesActions } from '../model/slice/rates-slice';

import { DropMenuOfCurrencies } from '@/entities/drop-menu-of-currencies';
import { FormOfInputs } from '@/entities/form-of-inputs/ui/form-of-inputs';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';

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
  const [inputValue, setInputValue] = useState<RequestObj | undefined>();

  const deSerializeRates = ratesInState && (new Map(JSON.parse(ratesInState)) as RatesType);
  const isMounted = useRef(false);

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
    if (!ratesInState) {
      const { abort, unsubscribe } = getCurrenciesRates();
      return () => {
        if (!isUninitialized) {
          abort();
          unsubscribe();
        }
      };
    }
  }, [dispatch, getCurrenciesRates, isUninitialized, ratesInState]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isMounted.current) {
      if (inputValue) {
        const { abort, unsubscribe } = getCurrenciesRates(inputValue);
        return () => {
          if (!isUninitialized) {
            abort();
            unsubscribe();
          }
        };
      }
    } else {
      isMounted.current = true;
    }
  }, [getCurrenciesRates, inputValue, isUninitialized]);

  const onChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value, id, dataset } = event.target;
    const { code } = dataset;

    const requestObj: RequestObj = {
      iso: id,
      value,
      code: code ?? Number(code),
      isValid: value === '' ? true : isNumber(value),
    };

    if (value === '' || value.match(/^([0-9]{1,})?(.)?([0-9]{1,})?$/)) {
      requestObj.value = parseFloat(value) || '';
      setInputValue(requestObj);
    }
  }, []);

  const handleClickDeleteCurrency = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const curIso = event.currentTarget.dataset.iso;

      if (curIso) dispatch(ratesActions.deleteCustomISO(curIso));
    },
    [dispatch],
  );

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && error && 'message' in error && error.message !== 'Aborted' && (
        <div className="pointer-events-none cursor-default py-12 text-base font-medium">
          {error.message}
        </div>
      )}
      {!isLoading && error && 'data' in error && error.data && (
        <div className="pointer-events-none cursor-default py-12 text-base font-medium">
          Something wrong on the server side, try later
        </div>
      )}
      {!isLoading && deSerializeRates && (
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
