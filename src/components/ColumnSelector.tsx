import { useCallback, useContext, useMemo } from 'react';
import {
  initialState,
  selectDisplayColumns,
  setColumns,
} from '../common/columnSlice';
import { useAppDispatch, useAppSelector } from '../common/hooks';
import { Columns } from '../common/types';
import { ModalContext, type ContextType } from './Modal';

const fixedColumns = initialState.displayColumns;

function ColumnSelector() {
  const { setShowModal } = useContext(ModalContext) as ContextType;
  const dispatch = useAppDispatch();
  const columnsSelector = useMemo(() => selectDisplayColumns, []);
  const displayedColumns = useAppSelector((state) => columnsSelector(state));

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const target = event.currentTarget;
      const formData = new FormData(target);
      const columns = formData.getAll('column-input') as string[];

      dispatch(setColumns(columns));
      setShowModal(false);
    },
    [dispatch, setShowModal]
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col px-6">
      <h3>Display data:</h3>
      {Object.keys(Columns).map((c) => (
        <div key={c} className="flex items-center">
          <input
            id={c}
            type="checkbox"
            name="column-input"
            value={c}
            disabled={fixedColumns.includes(c)}
            defaultChecked={displayedColumns.includes(c)}
            className="w-4 h-4 mr-3"
          />
          <label htmlFor={c}>{Columns[c as keyof typeof Columns]}</label>
        </div>
      ))}
      <div className="flex justify-center m-4">
        <button type="submit" aria-label="submit" className="max-w-fit">
          Apply
        </button>
      </div>
    </form>
  );
}
export default ColumnSelector;
