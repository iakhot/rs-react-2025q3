import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClose: () => void;
}
function ModalWrapper({ children, onClose }: Props) {
  return (
    <div className="modal">
      <button onClick={onClose}>Close</button>
      {children}
    </div>
  );
}

export default ModalWrapper;
