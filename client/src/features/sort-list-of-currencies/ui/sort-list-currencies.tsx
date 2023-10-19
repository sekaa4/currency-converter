/* eslint-disable consistent-return */
import { FC, useEffect, useRef } from 'react';

import { sortRatesActions } from '..';
import { useLazyFetchSortCurrenciesRatesFromAPI } from '../api/get-sort-currencies-from-API';
import { getRatesFromSortRatesState } from '../model/selectors/get-sort-rates-from-state/get-sort-rates-form-state';
import { getSortByFromSortRatesState } from '../model/selectors/get-sortby-from-state/get-sortby-from-state';

import { getTimestampFromSortRatesState } from '../model/selectors/get-timestamp-from-state/get-timestamp-from-state';

import { ListOfCurrencies } from '@/entities/list-of-cyrrencies';

import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { RatesType } from '@/shared/lib/types/response-rates.type';

import { MessageError } from '@/shared/ui/message-error/message-error';
import { Portal } from '@/shared/ui/portal/portal';
import { Spinner } from '@/shared/ui/spinner/spinner';

export const SortListCurrencies: FC = () => {
  const [getListCurrenciesRates, { data, isLoading, error, isUninitialized }] =
    useLazyFetchSortCurrenciesRatesFromAPI();

  const dispatch = useAppDispatch();
  const sortRatesInState = useAppSelector(getRatesFromSortRatesState);
  const sortByFromSortRatesState = useAppSelector(getSortByFromSortRatesState);
  const isMounted = useRef(false);
  const timestampInState = useAppSelector(getTimestampFromSortRatesState);

  useEffect(() => {
    if (data) {
      dispatch(sortRatesActions.changeSortState(data));
    }
  }, [data, dispatch]);

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

  useEffect(() => {
    if (isMounted.current) {
      const { order, sortBy } = sortByFromSortRatesState;
      if (sortBy && (order || order === null)) {
        const { abort } = getListCurrenciesRates({ order, sort: sortBy });
        return () => {
          abort();
        };
      }
    } else {
      isMounted.current = true;
    }
  }, [getListCurrenciesRates, sortByFromSortRatesState]);

  const deSerializeSortRates =
    sortRatesInState && (new Map(JSON.parse(sortRatesInState)) as RatesType);

  return (
    <>
      {isLoading && (
        <Portal>
          <Spinner />
        </Portal>
      )}
      <div className={`relative ${isLoading ? 'pointer-events-none -z-10 select-none' : ''}`}>
        {!isLoading && error && 'message' in error && error.message !== 'Aborted' && (
          <MessageError text={error.message} />
        )}
        {!isLoading && error && 'data' in error && <MessageError list />}

        {!isLoading && !error && deSerializeSortRates && (
          <div className="relative h-full pb-14 pt-[5rem]">
            <div className="wrap m-auto max-w-xs font-semibold">
              По курсу НБ РБ,{' '}
              {timestampInState
                ? `данные из базы на ${new Date(timestampInState).toLocaleString()}`
                : 'данные из локальной базы'}
            </div>
            <ListOfCurrencies deSerializeSortRates={deSerializeSortRates} />
          </div>
        )}
      </div>
    </>
  );
};
