import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { URLConstants } from '../lib/constants/server-url';

export const rtkAPI = createApi({
  reducerPath: 'API',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || URLConstants.SERVER_API_BASE_URL,
  }),
  endpoints: () => ({}),
});
