import { lazy, useCallback } from 'react';
import { type CountryData } from '../common/types';
import { ModalTrigger } from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilter,
  faArrowDownShortWide,
  faArrowUpWideShort,
} from '@fortawesome/free-solid-svg-icons';
import ColumnSelector from './ColumnSelector';
import Filter from './Filter';
import { useAppDispatch, useAppSelector } from '../common/hooks';
import { selectSort, setSort, type Sort } from '../common/tableSlice';

const TableRow = lazy(() => import('./TableRow'));

function DataList({ items }: { items: CountryData[] }) {
  const sortParams = useAppSelector(selectSort);
  const dispatch = useAppDispatch();

  const getSortIcon = (column: string, sortParams: Sort) => {
    if (sortParams.column === column) {
      return sortParams.order === 'asc'
        ? faArrowDownShortWide
        : faArrowUpWideShort;
    }
    return faArrowDownShortWide;
  };

  const handleSort = useCallback(
    (column: string) => {
      const order = sortParams.order === 'asc' ? 'desc' : 'asc';
      dispatch(setSort({ column, order }));
    },
    [dispatch, sortParams.order]
  );

  if (items.length == 0) return <p>No Data</p>;

  return (
    <>
      <Filter />
      <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border-separate border-spacing-y-1 border-spacing-x-0 bg-gray-500 rounded">
        <thead className="">
          <tr className="text-base text-white font-semibold ">
            <td className="p-4 items-center justify-center rounded-l-lg"></td>
            <td className="p-4 items-center justify-center">
              <span>Country</span>
              <button
                type="button"
                aria-label="sort-population"
                onClick={() => handleSort('name')}
                className="float-right table-button"
              >
                <FontAwesomeIcon icon={getSortIcon('name', sortParams)} />
              </button>
            </td>
            <td className="p-4 items-center justify-center">
              <span>Population</span>
              <button
                type="button"
                aria-label="sort-population"
                onClick={() => handleSort('population')}
                className="table-button float-right"
              >
                <FontAwesomeIcon icon={getSortIcon('population', sortParams)} />
              </button>
            </td>
            <td className="p-4 items-center justify-center rounded-r-lg">
              ISO
            </td>
            <td className="max-w-fit items-center justify-center">
              <ModalTrigger
                triggerChildren={<FontAwesomeIcon icon={faFilter} />}
              >
                <ColumnSelector />
              </ModalTrigger>
            </td>
          </tr>
        </thead>
        <tbody>
          {items.map((country) => (
            <TableRow
              item={country}
              name={country.name ?? ''}
              key={country.name}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DataList;
