import { useAppDispatch, useAppSelector } from '../common/hooks';
import { selectFilters, setFilters, type Filters } from '../common/tableSlice';
export const inputStyle = `bg-gray-200
              appearance-none
              border-2
              border-gray-200
              rounded
              py-1
              px-2
              ml-3
              text-gray-700
              leading-tight
              focus:outline-none
              focus:bg-white`;

function Filter() {
  const { selectedYear, countryName } = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const formData = new FormData(target);
    const year = Number(formData.get('year-input'));
    const name = formData.get('country-input')?.toString();
    const newFilters: Filters = {
      countryName: undefined,
      selectedYear: undefined,
    };
    if (year) {
      newFilters.selectedYear = year;
    }
    if (name !== '') {
      newFilters.countryName = name;
    }

    dispatch(setFilters(newFilters));
  };

  return (
    <div className="card flex justify-items-stretch">
      <form id="filters" onSubmit={handleSubmit}>
        <label htmlFor="year-input" className="px-6 font-600">
          Year:
          <input
            id="year-input"
            name="year-input"
            defaultValue={selectedYear}
            className={inputStyle}
          ></input>
        </label>
        <label htmlFor="country-input" className="px-6 font-600">
          Country:
          <input
            id="country-input"
            name="country-input"
            defaultValue={countryName}
            className={inputStyle}
          ></input>
        </label>
        <button type="submit" aria-label="submit" className="max-w-fit">
          Apply
        </button>
      </form>
    </div>
  );
}

export default Filter;
