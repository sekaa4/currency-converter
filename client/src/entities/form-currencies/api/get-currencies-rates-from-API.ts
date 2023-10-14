import { RequestObj } from '../model/types/request-obj.interface';

import { RatesType } from '../model/types/response-rates.type';

import { rtkAPI } from '@/shared/api/rtk-Api';
import { RequestObjDefaultParams } from '@/shared/lib/constants/request-obj-default-params';

const getCurrenciesRatesFromAPI = rtkAPI.injectEndpoints({
  endpoints: (build) => ({
    fetchCurrenciesRatesFromAPI: build.query<RatesType, RequestObj | void>({
      query: (
        {
          iso = RequestObjDefaultParams.ISO,
          value = RequestObjDefaultParams.VALUE,
          code = RequestObjDefaultParams.CODE,
        } = {} as RequestObj,
      ) => ({
        url: `/${code}`,
        params: {
          iso,
          value,
        },
      }),
    }),
  }),
});

export const useLazyFetchCurrenciesRatesFromAPI =
  getCurrenciesRatesFromAPI.useLazyFetchCurrenciesRatesFromAPIQuery;
