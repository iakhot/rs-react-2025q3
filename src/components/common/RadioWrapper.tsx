import type { ReactNode } from 'react';
import { errorStyle } from '../../common/style-const';
interface Props {
  children: ReactNode;
  label: string;
  error?: string | undefined;
}

function RadioWrapper({ children, label, error }: Props) {
  const name = `${label}-radio`;
  return (
    <div className=" md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label htmlFor={name}>{label}:</label>
      </div>
      <div className="md:w-2/3 flex flex-col">
        <div id={name} className="flex flex-row" aria-label={name}>
          {children}
        </div>
        {error && (
          <div>
            <p className={errorStyle}>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RadioWrapper;
