import {
  initialState,
  selectDisplayColumns,
  setColumns,
} from '../common/columnSlice';
import { useAppDispatch, useAppSelector } from '../common/hooks';
import { Columns } from '../common/types';

const fixedColumns = initialState.displayColumns;

function ColumnSelector() {
  const dispatch = useAppDispatch();
  const displayedColumns = useAppSelector(selectDisplayColumns);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const formData = new FormData(target);
    const columns = formData.getAll('column-input') as string[];

    dispatch(setColumns(columns));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-4">
      <label>Display data:</label>
      {Object.keys(Columns).map((c) => (
        <label key={c} htmlFor={c}>
          <input
            id={c}
            type="checkbox"
            name="column-input"
            value={c}
            disabled={fixedColumns.includes(c)}
            defaultChecked={displayedColumns.includes(c)}
          />
          {Columns[c as keyof typeof Columns]}
        </label>
      ))}
      <button type="submit" aria-label="submit" className="max-w-fit">
        Apply
      </button>
    </form>
  );
}
export default ColumnSelector;
