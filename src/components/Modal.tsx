import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import ModalWrapper from './ModalWrapper';
import { ModalContext } from '../common/types';

function Modal({
  children,
  container,
  title,
}: {
  children: ReactNode;
  container: RefObject<HTMLElement | null>;
  title: string;
}) {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal, handleClose]);

  //   useEffect(() => {
  //     const handleBlur = (event: MouseEvent) => {
  //       console.log(`====== MOUSE ${modalRef.current.contains(event.target)}`);
  //       if (
  //         modalRef.current &&
  //         !modalRef.current.contains(event.target as HTMLElement)
  //       ) {
  //         handleClose();
  //       }
  //     };
  //     if (showModal) {
  //       document.addEventListener('mousedown', handleBlur);
  //     }

  //     return () => {
  //       document.removeEventListener('mousedown', handleBlur);
  //     };
  //   }, [showModal, handleClose]);

  if (!container) {
    console.error('Target container is not found in DOM.');
    return null;
  }

  return (
    <div ref={modalRef}>
      {!showModal && (
        <button onClick={() => setShowModal(true)}>{title}</button>
      )}
      {showModal &&
        container.current &&
        createPortal(
          <ModalContext value={{ handleClose: handleClose }}>
            <ModalWrapper>{children}</ModalWrapper>
          </ModalContext>,
          container.current
        )}
    </div>
  );
}

export default Modal;
