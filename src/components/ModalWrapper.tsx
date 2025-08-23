import { useContext, type ReactNode } from 'react';
import { ModalContext } from '../common/types';

interface Props {
  children: ReactNode;
}
function ModalWrapper({ children }: Props) {
  const { handleClose } = useContext(ModalContext);
  return (
    <div className="flex flex-col justify-center p-8 max-w-sm">
      <div className="mb-6">
        <button onClick={handleClose}>Close</button>
      </div>
      {children}
    </div>
  );
}

export default ModalWrapper;
