import "./index.css";
import reciveImg from "../../assets/svg/arrow-down-right.svg";
import sendImg from "../../assets/svg/people-upload.svg";
import { MouseEventHandler } from "react";

export const BalanceActions = ({
  handlerRecive,
  handlerSend,
}: {
  handlerRecive: MouseEventHandler;
  handlerSend: MouseEventHandler;
}) => {
  return (
    <div className="balance__actions">
      <div className="balance__actions__item">
        <img
          onClick={handlerRecive}
          className="click"
          src={reciveImg}
          alt="recive"
        />
        <span>Receive</span>
      </div>
      <div className="balance__actions__item">
        <img onClick={handlerSend} className="click" src={sendImg} alt="send" />
        <span>Send</span>
      </div>
    </div>
  );
};
