/* eslint-disable @typescript-eslint/indent */
import { RatesStateFromServer } from '../model/types/rates-state.interface';

import { rtkAPI } from '@/shared/api/rtk-Api';
import { RequestObj } from '@/shared/lib/types/request-obj.interface';
import { isCorrectData } from '@/shared/lib/utils/is-correct-data';

const getCurrenciesRatesFromAPI = rtkAPI.injectEndpoints({
  endpoints: (build) => ({
    fetchCurrenciesRatesFromAPI: build.query<RatesStateFromServer, RequestObj | undefined | void>({
      query: ({ iso, value, code } = {} as RequestObj) => {
        if (code && (value || value === '') && iso) {
          return {
            url: '/currencies/code',
            params: {
              code,
              iso,
              value,
            },
          };
        }
        return {
          url: '/currencies/code',
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

export const useLazyFetchCurrenciesRatesFromAPI =
  getCurrenciesRatesFromAPI.useLazyFetchCurrenciesRatesFromAPIQuery;
