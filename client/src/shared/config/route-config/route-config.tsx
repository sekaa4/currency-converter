import { RouteProps } from 'react-router-dom';

import { CurrenciesListPage, MainPage, NotFoundPage } from '@/pages';
import { AppRoutes, routerPath } from '@/shared/lib/constants/app-routes';

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    index: true,
    path: routerPath.main,
    element: <MainPage />,
  },
  [AppRoutes.CURRENCIES_LIST]: {
    path: routerPath['currencies-list'],
    element: <CurrenciesListPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: routerPath.notfound,
    element: <NotFoundPage />,
  },
  [AppRoutes.UNKNOWN]: {
    path: routerPath.unknown,
    element: <NotFoundPage />,
  },
};
