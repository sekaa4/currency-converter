/* eslint-disable no-nested-ternary */
import { FC } from 'react';

import { useDispatch } from 'react-redux';

import { TABLE_HEAD } from '../model/constants/table-name';

import { sortRatesActions } from '@/features/sort-list-of-currencies';

import { getSortByFromSortRatesState } from '@/features/sort-list-of-currencies/model/selectors/get-sortby-from-state/get-sortby-from-state';
import { useAppSelector } from '@/shared/hooks';
import { SortByType } from '@/shared/lib/types/sort.type';
import './list-head.css';

interface TableHeadProps {
  columns: typeof TABLE_HEAD;
}

export const TableHead: FC<TableHeadProps> = ({ columns }) => {
  const dispatch = useDispatch();
  const { order, sortBy } = useAppSelector(getSortByFromSortRatesState);

  const handleSortingChange = (accessor: SortByType) => {
    dispatch(sortRatesActions.changeSortOrderState(accessor));
  };

  return (
    <thead>
      <tr>
        {columns.map((headInfo) => {
          const { accessor, label } = headInfo;
          const hasHandle = !!(accessor === 'name' || accessor === 'value');

          const cls = order === 'asc' ? 'asc' : order === 'desc' ? 'desc' : 'default';

          if (hasHandle) {
            return (
              <th
                key={accessor}
                className={`${
                  (sortBy !== accessor && 'default') || (sortBy === accessor && cls)
                } cursor-pointer select-none`}
                onClick={() => handleSortingChange(accessor)}
                scope="col"
              >
                {label}
              </th>
            );
          }

          return (
            <th key={accessor} className="pointer-events-none cursor-default" scope="col">
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
