import "./index.css";
import settingsImg from "../../assets/svg/settings.svg";
import notificationImg from "../../assets/svg/bell-dark.svg";
import { MouseEventHandler } from "react";

export const BalanceHeader = ({
  handlerSettings,
  handlerNotification,
}: {
  handlerSettings: MouseEventHandler;
  handlerNotification: MouseEventHandler;
}) => {
  return (
    <div className="balance__header">
      <img
        className="click"
        onClick={handlerSettings}
        src={settingsImg}
        alt=""
      />
      <h4 className="balance__header__title">Main wallet</h4>
      <img
        className="click"
        onClick={handlerNotification}
        src={notificationImg}
        alt=""
      />
    </div>
  );
};
