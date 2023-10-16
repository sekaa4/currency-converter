import { RatesStateFromServer } from '../model/types/rates-state.interface';

import { rtkAPI } from '@/shared/api/rtk-Api';
import { RequestObjDefaultParams } from '@/shared/lib/constants/request-obj-default-params';
import { RequestObj } from '@/shared/lib/types/request-obj.interface';
import { isCorrectData } from '@/shared/lib/utils/is-correct-data';

const getCurrenciesRatesFromAPI = rtkAPI.injectEndpoints({
  endpoints: (build) => ({
    fetchCurrenciesRatesFromAPI: build.query<RatesStateFromServer, RequestObj | void>({
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
      transformResponse: (response: unknown) => {
        if (isCorrectData(response)) {
          return response;
        }
        console.log('response', response);

        throw new Error('Recived incorrect data from server, try reload page');
      },
    }),
  }),
});

export const useLazyFetchCurrenciesRatesFromAPI =
  getCurrenciesRatesFromAPI.useLazyFetchCurrenciesRatesFromAPIQuery;
