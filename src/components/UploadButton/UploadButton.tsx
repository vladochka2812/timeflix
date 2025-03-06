import classNames from "classnames";
import { regularButtonStyle } from "../../styles/reusableStyles";

export const UploadButton = ({
  handleFileUpload,
}: {
  handleFileUpload: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
}) => {
  return (
    <input
      className={classNames(regularButtonStyle, "w-full h-10 rounded-[8px]")}
      id="file_input"
      type="file"
      accept=".ics"
      onChange={handleFileUpload}
    />
  );
};
