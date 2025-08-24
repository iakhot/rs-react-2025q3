import { cloneElement, isValidElement, type ReactElement } from 'react';
import { errorStyle, inputStyle } from '../../common/style-const';

interface Props {
  children: ReactElement<HTMLInputElement>;
  label: string;
  error?: string | undefined;
}

function InputWrapper({ children, label, error }: Props) {
  let childId = '';
  let childType = '';
  let child = cloneElement(children);
  if (isValidElement(children)) {
    childId = (children.props as { id: string }).id;
    childType = (children.props as { type: string }).type;
  }
  if (childType !== 'file') {
    child = cloneElement(children, {
      className: inputStyle + ' ' + children.props['className'],
    });
  }
  return (
    <div className=" md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label htmlFor={childId}>{label}:</label>
      </div>
      <div className="md:w-2/3">
        {child}
        {error && <p className={errorStyle}>{error}</p>}
      </div>
    </div>
  );
}

export default InputWrapper;
