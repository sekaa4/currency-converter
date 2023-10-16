import { FC, useEffect } from 'react';

import { ratesActions } from '@/features/form-currencies';
import { useLazyFetchCurrenciesRatesFromAPI } from '@/features/form-currencies/api/get-currencies-rates-from-API';
import { getRatesFromState } from '@/features/form-currencies/model/selectors/get-rates-from-state/get-rates-from-state';
import { getTimestampFromState } from '@/features/form-currencies/model/selectors/get-timestamp-from-state/get-timestamp-from-state';
import { useAppSelector, useAppDispatch } from '@/shared/hooks';
import { RatesType, ResponseCurrency } from '@/shared/lib/types/response-rates.type';
import { InputCurrency } from '@/shared/ui/input-currency/input-currency';
import { Spinner } from '@/shared/ui/spinner/spinner';

const CurrenciesListPage: FC = () => {
  const [getCurrenciesRates, { data, error, isLoading, isUninitialized }] =
    useLazyFetchCurrenciesRatesFromAPI();

  const ratesInState = useAppSelector(getRatesFromState);
  const timestampInState = useAppSelector(getTimestampFromState);
  const deSerializeRates = ratesInState && (new Map(JSON.parse(ratesInState)) as RatesType);
  const dispatch = useAppDispatch();

  // console.log('isLoading', isLoading, isUninitialized, isFetching);
  // console.log('first', data);
  // console.log('ratesInState', ratesInState);

  useEffect(() => {
    if (data) {
      dispatch(ratesActions.changeState(data));
    }
  }, [data, dispatch]);

  if (!ratesInState && isUninitialized) {
    getCurrenciesRates();
  }

  return (
    <div className="mx-auto max-w-7xl py-10 font-medium">
      <div>Currencies LIST</div>
      {isLoading && <Spinner />}
      {error && 'message' in error && (
        <div className="pointer-events-none cursor-default py-12 text-base font-medium">
          {error.message}
        </div>
      )}
      {deSerializeRates && (
        <form>
          <fieldset>
            <legend>
              По курсу НБ РБ,{' '}
              {timestampInState
                ? `данные из базы на ${new Date(timestampInState)}`
                : 'данные из локальной базы'}
            </legend>
            {(Array.from(deSerializeRates.values()) as ResponseCurrency[]).map((currency) => {
              const { code, iso, name, value } = currency;
              return <InputCurrency key={code} name={name} value={value} iso={iso} code={code} />;
            })}
          </fieldset>
        </form>
      )}
    </div>
  );
};
export default CurrenciesListPage;
