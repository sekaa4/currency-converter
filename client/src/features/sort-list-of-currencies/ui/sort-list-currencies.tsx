/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect } from 'react';

import { sortRatesActions } from '..';
import { useLazyFetchSortCurrenciesRatesFromAPI } from '../api/get-sort-currencies-from-API';
import { getRatesFromSortRatesState } from '../model/selectors/get-sort-rates-from-state/get-sort-rates-form-state';
import { getSortByFromSortRatesState } from '../model/selectors/get-sortby-from-state/get-sortby-from-state';

import { ListOfCurrencies } from '@/entities/list-of-cyrrencies';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { RatesType } from '@/shared/lib/types/response-rates.type';

import { Spinner } from '@/shared/ui/spinner/spinner';

export const SortListCurrencies: FC = () => {
  const [getListCurrenciesRates, { data, isLoading, isUninitialized }] =
    useLazyFetchSortCurrenciesRatesFromAPI();

  const dispatch = useAppDispatch();
  const sortRatesInState = useAppSelector(getRatesFromSortRatesState);
  const sortByFromSortRatesState = useAppSelector(getSortByFromSortRatesState);
  // const timestampInState = useAppSelector(getTimestampFromSortRatesState);

  const deSerializeSortRates =
    sortRatesInState && (new Map(JSON.parse(sortRatesInState)) as RatesType);

  console.log('handle', sortRatesInState);
  console.log('NOhandle', sortByFromSortRatesState);

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
  }, [
    dispatch,
    isUninitialized,
    getListCurrenciesRates,
    sortRatesInState,
    sortByFromSortRatesState,
  ]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const { order, sortBy } = sortByFromSortRatesState;

    if ((order && sortBy) || (sortBy && order === null)) {
      const { abort, unsubscribe } = getListCurrenciesRates({ order, sort: sortBy });
      return () => {
        abort();
        unsubscribe();
      };
    }
  }, [getListCurrenciesRates, sortByFromSortRatesState]);

  return (
    <>
      {isLoading && <Spinner />}
      {/* {error && 'message' in error && (
        <div className="pointer-events-none cursor-default py-12 text-base font-medium">
          {error.message}
        </div>
      )} */}
      {!isLoading && deSerializeSortRates && (
        <div className="relative h-full pb-7 pt-[4.5rem]">
          <ListOfCurrencies deSerializeSortRates={deSerializeSortRates} />
        </div>
      )}
    </>
  );
};
