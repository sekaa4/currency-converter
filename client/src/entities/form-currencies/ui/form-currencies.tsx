import { FC, useEffect } from 'react';

import { useLazyFetchCurrenciesRatesFromAPI } from '../api/get-currencies-rates-from-API';
import { getRatesFromState } from '../model/selectors/get-rates-from-state/get-rates-from-state';
import { ratesActions } from '../model/slice/rates-slice';

import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { InputCurrency } from '@/shared/ui/input-currency/input-currency';
import { Spinner } from '@/shared/ui/spinner/spinner';

export const FormCurrencies: FC = () => {
  const [getCurrenciesRates, { data, error, isLoading, isUninitialized, isFetching }] =
    useLazyFetchCurrenciesRatesFromAPI();

  const ratesInState = useAppSelector(getRatesFromState);
  const dispatch = useAppDispatch();

  console.log('isLoading', isLoading, isUninitialized, isFetching);
  console.log('first', data);
  console.log('ratesInState', ratesInState);

  useEffect(() => {
    if (data) {
      dispatch(ratesActions.changeRates(data));
    }
  }, [data, dispatch]);

  if (ratesInState.length === 0 && isUninitialized) {
    getCurrenciesRates();
  }

  return (
    <>
      {isLoading && <Spinner />}
      {error && <div>{JSON.stringify(error)}</div>}
      {ratesInState.length !== 0 && (
        <div className="mx-auto max-w-7xl">
          <form>
            <fieldset>
              <legend>По курсу НБ РБ</legend>
              {ratesInState.map((currency) => {
                const { code, iso, name, value } = currency;
                return <InputCurrency key={code} name={name} value={value} iso={iso} />;
              })}
            </fieldset>
          </form>
        </div>
      )}
    </>
  );
};
