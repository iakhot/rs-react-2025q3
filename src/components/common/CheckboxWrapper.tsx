import type { ReactElement } from 'react';
import { errorStyle } from '../../common/style-const';

interface Props {
  children: ReactElement<HTMLInputElement>;
  label: string;
  error?: string | undefined;
}
function CheckboxWrapper({ children, label, error }: Props) {
  return (
    <div className=" md:flex md:items-center mb-6 flex-col">
      <label
        htmlFor="accept-terms"
        className="md:w-2/3 block text-gray-500 font-bold"
      >
        {children}
        <span className="text-sm">{label}</span>
      </label>
      {error && (
        <div>
          <p className={errorStyle}>{error}</p>
        </div>
      )}
    </div>
  );
}

export default CheckboxWrapper;
