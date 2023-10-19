import { FC } from 'react';

import { TableBody } from './list-body';
import { TableHead } from './list-head';

import { TABLE_HEAD } from '../model/constants/table-name';

import { RatesType } from '@/shared/lib/types/response-rates.type';

export interface ListOfCurrenciesProps {
  deSerializeSortRates: RatesType;
}

export const ListOfCurrencies: FC<ListOfCurrenciesProps> = (props) => {
  const { deSerializeSortRates } = props;

  const infoAboutCurrencies = deSerializeSortRates && Array.from(deSerializeSortRates.values());

  return (
    <table className="table">
      <TableHead columns={TABLE_HEAD} />
      <TableBody tableData={infoAboutCurrencies} />
    </table>
  );
};
