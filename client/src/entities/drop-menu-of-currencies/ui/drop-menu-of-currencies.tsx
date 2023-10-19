import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { FC, Fragment, useCallback, useRef, useState } from 'react';

import { ratesActions } from '@/features/form-currencies';
import { useAppDispatch } from '@/shared/hooks';
import { useOutsideClick } from '@/shared/hooks/use-outside-click';
import { RatesType, ResponseCurrency } from '@/shared/lib/types/response-rates.type';

export interface DropMenuOfCurrenciesProps {
  deSerializeRates: RatesType | '';
  isoOutOfDropMenu: string[];
}

export const DropMenuOfCurrencies: FC<DropMenuOfCurrenciesProps> = (props) => {
  const dispatch = useAppDispatch();

  const { deSerializeRates, isoOutOfDropMenu } = props;

  const elementRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState<boolean>(false);

  const outSideCloseCallback = useCallback(() => setIsShow(false), []);
  const currenciesISO = deSerializeRates && Array.from(deSerializeRates.keys());

  useOutsideClick(elementRef, outSideCloseCallback);

  const handleClickAddCurrency = (event: React.MouseEvent<HTMLButtonElement>) => {
    const curIso = event.currentTarget.dataset.iso;
    setIsShow(!isShow);
    if (curIso) dispatch(ratesActions.addCustomISO(curIso));
  };

  return (
    <div className="flex">
      <div className="top-14  w-full " ref={elementRef}>
        <div className="top-16 w-full text-right">
          <Menu as="div" className="inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-40 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Add currency
                <ChevronDownIcon
                  className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className=" max-w-56 absolute bottom-[13vh] right-0 mt-2 h-[28vh] origin-top-right divide-y divide-gray-100 overflow-visible overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:-right-72">
                {currenciesISO &&
                  currenciesISO.map((customIso) => {
                    if (deSerializeRates.has(customIso) && !isoOutOfDropMenu.includes(customIso)) {
                      const { iso, name } = deSerializeRates.get(customIso) as ResponseCurrency;
                      return (
                        <div className="px-1 py-1 " key={name}>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                type="button"
                                className={`${
                                  active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                } group flex w-full items-center gap-x-3 rounded-md px-2 py-2 text-sm`}
                                onClick={handleClickAddCurrency}
                                data-iso={iso}
                              >
                                <span className="font-bold">{iso}</span>
                                <span>{name}</span>
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      );
                    }
                    return '';
                  })}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};
