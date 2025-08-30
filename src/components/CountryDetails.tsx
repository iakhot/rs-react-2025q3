import { useAppSelector } from '../common/hooks';
import { selectDisplayColumns } from '../common/columnSlice';
import { Columns, type YearData } from '../common/types';
import { convertFloat } from '../common/utils';

function CountryDetails({ years, open }: { years: YearData[]; open: boolean }) {
  const displayColumns = useAppSelector(selectDisplayColumns);
  const last = displayColumns.length - 1;
  const header = displayColumns.map((c, index) => (
    <th
      key={c}
      className={`py-3 px-4 whitespace-nowrap ${index == 0 ? 'rounded-l-lg' : index == last ? 'rounded-r-lg' : ''}`}
    >
      {Columns[c as keyof typeof Columns]}
    </th>
  ));

  const values = years?.map((cdata, index) => (
    <tr key={index} className="bg-gray-200 ">
      {displayColumns.map((c, i) => (
        <td
          key={c}
          className={`py-3 px-4 ${i == 0 ? 'rounded-l-lg' : i == last ? 'rounded-r-lg' : ''}`}
        >
          {convertFloat(cdata?.[c as keyof typeof Columns]) ?? 'N/A'}
        </td>
      ))}
    </tr>
  ));
  return (
    <table
      className={`px-10 w-fit  ${open ? 'block' : 'hidden'} mx-auto border-separate border-spacing-x-0 border-spacing-y-2`}
    >
      <thead className="bg-[#222E3A]/[6%] rounded-lg text-base text-white font-semibold w-full">
        <tr className="bg-gray-400 ">{header}</tr>
      </thead>
      <tbody className="text-gray-800">{values}</tbody>
    </table>
  );
}

export default CountryDetails;
