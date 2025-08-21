import type { YearData } from '../common/types';

function CountryDetails({ years, open }: { years: YearData[]; open: boolean }) {
  return (
    <table
      className={`px-10 w-fit  ${open ? 'block' : 'hidden'} mx-auto border-separate border-spacing-x-0 border-spacing-y-2`}
    >
      <thead className="bg-[#222E3A]/[6%] rounded-lg text-base text-white font-semibold w-full">
        <tr className="bg-gray-400 ">
          <th className="py-3 px-4 whitespace-nowrap rounded-l-lg ">Year</th>
          <th className="py-3 px-4 whitespace-nowrap ">Population</th>
          <th className="py-3 px-4 whitespace-nowrap">CO2</th>
          <th className="py-3 px-4 whitespace-nowrap rounded-r-lg">
            CO2 per capita
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-800">
        {years?.map((cdata, key) => (
          <tr key={key} className="bg-gray-200 ">
            <td className="py-3 px-4 rounded-l-lg">{cdata?.year}</td>
            <td className="py-3 px-4">{cdata?.population}</td>
            <td className="py-3 px-4 text-center">{cdata?.co2}</td>
            <td className="py-3 px-4 text-center rounded-r-lg">
              {cdata?.co2_per_capita}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CountryDetails;
