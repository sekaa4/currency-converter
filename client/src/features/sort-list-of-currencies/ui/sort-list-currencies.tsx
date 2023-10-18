/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useRef } from 'react';

import { sortRatesActions } from '..';
import { useLazyFetchSortCurrenciesRatesFromAPI } from '../api/get-sort-currencies-from-API';
import { getRatesFromSortRatesState } from '../model/selectors/get-sort-rates-from-state/get-sort-rates-form-state';
import { getSortByFromSortRatesState } from '../model/selectors/get-sortby-from-state/get-sortby-from-state';

import { ListOfCurrencies } from '@/entities/list-of-cyrrencies';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { RatesType } from '@/shared/lib/types/response-rates.type';

import { Spinner } from '@/shared/ui/spinner/spinner';

export const SortListCurrencies: FC = () => {
  const [getListCurrenciesRates, { data, isLoading, error, isUninitialized }] =
    useLazyFetchSortCurrenciesRatesFromAPI();

  const dispatch = useAppDispatch();
  const sortRatesInState = useAppSelector(getRatesFromSortRatesState);
  const sortByFromSortRatesState = useAppSelector(getSortByFromSortRatesState);
  const isMounted = useRef(false);
  // const timestampInState = useAppSelector(getTimestampFromSortRatesState);

  useEffect(() => {
    if (data) {
      dispatch(sortRatesActions.changeSortState(data));
    }
  }, [data, dispatch]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!sortRatesInState) {
      const { abort, unsubscribe } = getListCurrenciesRates();
      return () => {
        if (!isUninitialized) {
          abort();
          unsubscribe();
        }
      };
    }
  }, [getListCurrenciesRates, isUninitialized, sortRatesInState]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isMounted.current) {
      const { order, sortBy } = sortByFromSortRatesState;
      if (sortBy && (order || order === null)) {
        const { abort, unsubscribe } = getListCurrenciesRates({ order, sort: sortBy });
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
  }, [getListCurrenciesRates, isUninitialized, sortByFromSortRatesState]);

  const deSerializeSortRates =
    sortRatesInState && (new Map(JSON.parse(sortRatesInState)) as RatesType);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && error && 'message' in error && error.message !== 'Aborted' && (
        <div className="pointer-events-none cursor-default py-12 text-base font-medium">
          {error.message}
        </div>
      )}
      {!isLoading && deSerializeSortRates && (
        <div className="relative h-full pb-7 pt-[4.5rem]">
          <ListOfCurrencies deSerializeSortRates={deSerializeSortRates} />
        </div>
      )}
    </>
  );
};
