import "./index.css";
import warning from "../../assets/svg/warning.svg";

export const Alert = ({
  message,
  isOK,
}: {
  message: string;
  isOK?: boolean;
}) => {
  return (
    <span className={`alert ${isOK && "alert--ok"}`}>
      {!isOK && <img src={warning} alt="" />}
      <p>{message}</p>
    </span>
  );
};
