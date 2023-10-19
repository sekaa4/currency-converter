import { RatesStateFromServer } from '../model/types/rates-state.interface';

import { rtkAPI } from '@/shared/api/rtk-Api';
import { RequestSortObj } from '@/shared/lib/types/request-sort-obj.interface';
import { isCorrectData } from '@/shared/lib/utils/is-correct-data';

const getSortCurrenciesFromAPI = rtkAPI.injectEndpoints({
  endpoints: (build) => ({
    fetchSortCurrenciesFromAPI: build.query<RatesStateFromServer, RequestSortObj | void>({
      query: (searchParams) => {
        if (searchParams) {
          const { sort, order } = searchParams;

          return {
            url: '/currencies',
            params: {
              sort,
              order,
            },
          };
        }

        return {
          url: '/currencies',
        };
      },
      transformResponse: (response: unknown) => {
        if (isCorrectData(response)) {
          return response;
        }

        throw new Error('Recived incorrect data from server, try reload page');
      },
    }),
  }),
});

export const useLazyFetchSortCurrenciesRatesFromAPI =
  getSortCurrenciesFromAPI.useLazyFetchSortCurrenciesFromAPIQuery;
