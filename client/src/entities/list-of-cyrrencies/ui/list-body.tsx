import { FC } from 'react';

import { ResponseCurrency } from '@/shared/lib/types/response-rates.type';

interface TableBodyProps {
  tableData: ResponseCurrency[];
}

export const TableBody: FC<TableBodyProps> = ({ tableData }) => (
  <tbody>
    {tableData.map((currency, inx) => {
      const position = inx + 1;
      const { code, iso, name, value } = currency;
      return (
        <tr key={code} className="hover">
          <td>{position || '——'}</td>
          <td>{iso || '——'}</td>
          <td>{value || '——'}</td>
          <td>{name || '——'}</td>
          <td>{code || '——'}</td>
        </tr>
      );
    })}
  </tbody>
);
