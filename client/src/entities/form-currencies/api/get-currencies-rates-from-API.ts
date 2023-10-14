import { RequestObj } from '../model/types/request-obj.interface';

import { rtkAPI } from '@/shared/api/rtk-Api';

const getCurrenciesRatesFromAPI = rtkAPI.injectEndpoints({
  endpoints: (build) => ({
    fetchCurrenciesRatesFromAPI: build.query<Record<string, string>, RequestObj>({
      query: ({ iso, value, code }) => ({
        url: code ? `/${code}` : '',
        params: {
          iso,
          value,
        },
      }),
    }),
  }),
});

export const fetchCurrenciesRatesFromAPI =
  getCurrenciesRatesFromAPI.useFetchCurrenciesRatesFromAPIQuery;
