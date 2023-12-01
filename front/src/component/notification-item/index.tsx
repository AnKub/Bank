import { NotificationType } from "../../container/notifications";
import "./index.css";

export const NotificationItem = ({ item }: { item: NotificationType }) => {
  return (
    <div className="notification__item">
      <img src={item.img} alt="" />
      <div className="notification__block">
        <span className="notification__text">{item.message}</span>
        <div className="notification__info">
          <span>{item.time}</span>
          <span>{item.type}</span>
        </div>
      </div>
    </div>
  );
};
