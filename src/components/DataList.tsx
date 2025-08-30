import { lazy } from 'react';
import type { EmissionsData } from '../common/types';
import { ModalTrigger } from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import ColumnSelector from './ColumnSelector';
import Filter from './Filter';

const TableRow = lazy(() => import('./TableRow'));

function DataList({ items }: { items: EmissionsData }) {
  if (Object.keys(items).length == 0) return <p>No Data</p>;
  return (
    <>
      <Filter />
      <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border-separate border-spacing-y-1 border-spacing-x-0 bg-gray-500 rounded">
        <thead className="">
          <tr className="text-base text-white font-semibold ">
            <td className="p-4 items-center justify-center rounded-l-lg"></td>
            <td className="p-4 items-center justify-center">Country</td>
            <td className="p-4 items-center justify-center">Population</td>
            <td className="p-4 items-center justify-center rounded-r-lg">
              ISO
            </td>
            <td className="max-w-fit float-right">
              <ModalTrigger
                triggerChildren={<FontAwesomeIcon icon={faFilter} />}
              >
                <ColumnSelector />
              </ModalTrigger>
            </td>
          </tr>
        </thead>
        <tbody>
          {Object.keys(items).map((key) => (
            <TableRow item={items[key]} name={key} key={key} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DataList;
