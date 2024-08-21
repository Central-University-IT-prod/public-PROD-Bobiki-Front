import { ReactNode } from "react";
import styles from "./Modal.module.scss";
import { createPortal } from "react-dom";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }
  return createPortal(
    <div
      className={styles.modal}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      tabIndex={0}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          x
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
