import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClose: () => void;
}
function ModalWrapper({ children, onClose }: Props) {
  return (
    <div className="flex flex-col justify-center p-8 max-w-sm">
      <div className="mb-6">
        <button onClick={onClose}>Close</button>
      </div>
      {children}
    </div>
  );
}

export default ModalWrapper;
