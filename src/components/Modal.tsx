import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ContextType = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

const ModalContext = createContext<ContextType | null>(null);

const Root = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const value = { showModal, setShowModal };

  return <ModalContext value={value}>{children}</ModalContext>;
};

interface Props {
  children: ReactNode;
  onClose: () => void;
}

const ModalWrapper = ({ children, onClose }: Props) => {
  return (
    <div className="flex flex-col rounded-lg min-w-[300px] min-h-[400px]">
      <button
        type="button"
        className="table-button m-2 ml-auto max-w-fit"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      {children}
    </div>
  );
};

const Modal = ({ children }: { children: ReactNode }) => {
  const { showModal } = useContext(ModalContext) as ContextType;

  return <>{showModal && createPortal(<>{children}</>, document.body)}</>;
};

const Dialog = ({ children }: { children: ReactNode }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { setShowModal } = useContext(ModalContext) as ContextType;

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      dialogRef.current?.close();
    }
  };

  useEffect(() => {
    if (!dialogRef.current) {
      throw new Error('Dialog element is missing');
    }
    dialogRef.current.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={handleClose}
      className="flex fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      aria-modal="true"
    >
      <div className="rounded bg-gray-400 shadow-indigo-500/50">
        <ModalWrapper onClose={handleClose}>{children}</ModalWrapper>
      </div>
    </dialog>
  );
};

const Trigger = ({ children }: { children: ReactNode }) => {
  const { setShowModal } = useContext(ModalContext) as ContextType;

  return (
    <button
      type="button"
      className="float-right mr-4 table-button"
      onClick={() => {
        setShowModal(true);
      }}
    >
      {children}
    </button>
  );
};

const ModalTrigger = ({
  triggerChildren,
  children,
}: {
  triggerChildren: ReactNode;
  children: ReactNode;
}) => {
  return (
    <Modal.Root>
      <Modal.Trigger>{triggerChildren}</Modal.Trigger>
      <Modal>
        <Modal.Dialog>{children}</Modal.Dialog>
      </Modal>
    </Modal.Root>
  );
};

Modal.Dialog = Dialog;
Modal.Trigger = Trigger;
Modal.Root = Root;

export { ModalTrigger, ModalContext };
export type { ContextType };
