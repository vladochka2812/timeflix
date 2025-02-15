import { FC, useRef } from "react";
import classNames from "classnames";
import { LuX } from "react-icons/lu";
import { handleClose, handleOpen } from "../../helpers/handleBlockScroll";

type SheetPosition = "top" | "right" | "bottom" | "left";

export interface SheetProps {
  position?: SheetPosition;
  children: React.ReactNode;
  style?: string;
  isOpen: boolean;
  onClose: () => void;
}

const Sheet: FC<SheetProps> = ({
  position,
  children,
  isOpen,
  style,
  onClose,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  if (isOpen) {
    handleOpen();
  } else {
    handleClose();
  }

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
      onClose();
      handleClose();
    }
  };

  return (
    <div
      className={classNames({
        "fixed inset-0 z-50 bg-black/40": isOpen,
        hidden: !isOpen,
      })}
      onClick={handleOutsideClick}
    >
      <div
        ref={sheetRef}
        className={classNames(
          "fixed z-50 overflow-scroll bg-zinc-900 overflow-x-hidden",
          {
            "left-0 w-full h-full sm:max-w-[300px] border-r-2":
              position === "left",
            "right-0 w-full h-full sm:max-w-[800px] border-l border-l-[#FF5630] transition delay-150 duration-300 ease-in-out":
              position === "right",
            "bottom-0 w-full": position === "bottom",
            "top-0 w-full h-full": position === "top",
          },
          {
            "left-[-100%]": position === "left" && !isOpen,
            "right-[-100%]": position === "right" && !isOpen,
            "bottom-[-100%]": position === "bottom" && !isOpen,
            "top-[-100%]": position === "top" && !isOpen,
          },
          style
        )}
      >
        <LuX
          size={20}
          onClick={() => {
            onClose();
            handleClose();
          }}
          className="absolute top-3 right-3 cursor-pointer text-white z-50"
        />
        <div className={classNames("h-full", style)}>{children}</div>
      </div>
    </div>
  );
};

export default Sheet;
