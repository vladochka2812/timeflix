import classNames from "classnames";
import { useEffect, useState, FC } from "react";
import { createPortal } from "react-dom";
import { LuX } from "react-icons/lu";
import { handleClose, handleOpen } from "../../helpers/handleBlockScroll";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: string;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, style }) => {
  const [modalRoot, setModalRoot] = useState<Element | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById("modal"));
  }, []);

  useEffect(() => {
    if (isOpen) {
      handleOpen();
    } else {
      handleClose();
    }
    return () => handleClose();
  }, [isOpen]);

  if (!modalRoot) return null;

  return createPortal(
    <div
      onClick={() => onClose()}
      className={classNames(
        "fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity z-50",
        { "opacity-100 visible": isOpen, "opacity-0 invisible": !isOpen }
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={classNames(
          "relative bg-white rounded-lg transition-transform",
          style,
          {
            "scale-100 opacity-100": isOpen,
            "scale-125 opacity-0": !isOpen,
          }
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 rounded-full text-white"
        >
          <LuX size={15} />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
export default Modal;
