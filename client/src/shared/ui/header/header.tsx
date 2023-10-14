import { FC } from 'react';

import { NavLink, useLocation } from 'react-router-dom';

import { routerPath } from '@/shared/lib/constants/app-routes';
import { TitlePage } from '@/shared/lib/constants/title-page';

interface NavbarProps {
  className?: string;
}

interface ActiveObjectLink {
  isActive: boolean;
  isPending: boolean;
}

export const Header: FC<NavbarProps> = () => {
  const location = useLocation();
  const isActiveLink = ({ isActive }: ActiveObjectLink) =>
    isActive
      ? 'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white'
      : 'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white';

  let title: string;
  switch (location.pathname) {
    case routerPath.main:
      title = TitlePage.Currencies_Converter;
      break;
    case routerPath['currencies-list']:
      title = TitlePage.CURRENCIES_LIST;
      break;
    default:
      title = TitlePage.Currencies_Converter;
      break;
  }

  return (
    <header>
      <div className="bg-gray-800">
        <div className="relative mx-auto flex max-w-7xl flex-row-reverse items-center justify-between">
          <h1 className="cursor-default rounded-md px-3 py-2 text-xl font-medium text-white">
            {title}
          </h1>
          <nav>
            <div className="px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="h-8 w-10"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex gap-5 space-x-4">
                      <NavLink to="/" className={isActiveLink} aria-current="page">
                        Main
                      </NavLink>
                      <NavLink to="/all-currencies" className={isActiveLink} aria-current="page">
                        All-Currencies
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
