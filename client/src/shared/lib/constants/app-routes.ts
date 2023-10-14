export enum AppRoutes {
  MAIN = 'main',
  CURRENCIES_LIST = 'currencies-list',
  NOT_FOUND = 'notfound',
  UNKNOWN = 'unknown',
}

export const routerPath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.CURRENCIES_LIST]: '/all-currencies',
  [AppRoutes.NOT_FOUND]: '/404',
  [AppRoutes.UNKNOWN]: '*',
};
