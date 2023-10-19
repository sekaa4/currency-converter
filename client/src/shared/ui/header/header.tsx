import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import img from '@/shared/assets/icons/currency-converter-icon.svg';
import { routerPath } from '@/shared/lib/constants/app-routes';
import { TitlePage } from '@/shared/lib/constants/title-page';

interface ActiveObjectLink {
  isActive: boolean;
  isPending: boolean;
}

interface NavbarProps {
  classNameName?: string;
}

const navigation = [
  { name: 'Main', to: '/', current: true },
  { name: 'All-Currencies', to: '/all-currencies', current: false },
];

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
    <header className="fixed z-10 w-full bg-gray-800">
      <Disclosure
        as="nav"
        className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between sm:flex-nowrap"
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl flex-grow-0 sm:flex-grow sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 top-0 flex items-center sm:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-end sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-1 flex hidden items-center sm:flex sm:flex-shrink-0">
                    <img className="h-8 w-auto" src={img} alt="Currency Converter" />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className={isActiveLink}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="flex-grow cursor-default rounded-md px-3 align-middle text-xl font-medium text-white sm:flex-grow-0">
              {title}
            </h1>
            <Disclosure.Panel className="w-full pb-2 sm:hidden ">
              <div className=" space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={isActiveLink}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
};
