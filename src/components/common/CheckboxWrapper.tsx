import type { ReactElement } from 'react';

interface Props {
  children: ReactElement<HTMLInputElement>;
  label: string;
}
function CheckboxWrapper({ children, label }: Props) {
  return (
    <div className=" md:flex md:items-center mb-6">
      <label
        htmlFor="accept-terms"
        className="md:w-2/3 block text-gray-500 font-bold"
      >
        {children}
        <span className="text-sm">{label}</span>
      </label>
    </div>
  );
}

export default CheckboxWrapper;
