import { FC } from "react";
import classNames from "classnames";

import { regularButtonStyle } from "../../styles/reusableStyles";

interface ConfirmPopupProps {
  title: string;
  handleSubmit?: (item: any) => void;
  handleClose?: (isOpen: boolean) => void;
}
const ConfirmPopup: FC<ConfirmPopupProps> = ({
  title,
  handleSubmit,
  handleClose,
}) => {
  return (
    <div className="flex flex-col w-[300px] p-6 bg-neutral-900 items-center rounded-lg">
      <h2 className="text-center text-[18px] font-semibold text-white">
        {title}
      </h2>
      {handleClose && handleSubmit && (
        <div className="flex justify-between w-[200px] mt-5">
          <button
            onClick={() => handleClose(false)}
            className="bg-neutral-400 px-2 w-[80px]"
          >
            No
          </button>
          <button
            onClick={handleSubmit}
            className={classNames(regularButtonStyle, "w-[80px]")}
          >
            Yes
          </button>
        </div>
      )}
    </div>
  );
};

export default ConfirmPopup;
