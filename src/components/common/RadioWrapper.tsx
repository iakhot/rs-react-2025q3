import type { ReactNode } from 'react';
interface Props {
  children: ReactNode;
  label: string;
}

function RadioWrapper({ children, label }: Props) {
  const name = `${label}-radio`;
  return (
    <div className=" md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label htmlFor={name}>{label}:</label>
      </div>
      <div id={name} className="md:w-2/3 flex" aria-label={name}>
        {children}
      </div>
    </div>
  );
}

export default RadioWrapper;
