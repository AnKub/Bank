import "./index.css";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/authProvider";
import { Logout } from "../logout";
import { List } from "../../component/list";
import { getNotifications } from "../../services/api";
import warningImg from "../../assets/svg/warning-not.svg";
import bellImg from "../../assets/svg/bell-light.svg";
import { formatDateDifference } from "../../utils/formats";
import { NotificationItem } from "../../component/notification-item";

export type NotificationType = {
  id: number;
  type: "Announcement" | "Warning";
  message: string;
  img: string;
  time: string;
};

export const Notifications = () => {
  const { state } = useContext(AuthContext);
  const [isLogout, setIsLogout] = useState<boolean>(false);

  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (!state.token) return setIsLogout(true);
    try {
      const res = await getNotifications(state.token);
      if (!res.data) return;

      const notificationsFormat = formatData(res.data);
      console.log(notificationsFormat);
      setNotifications(notificationsFormat);
    } catch (error: any) {
      alert(error);
      if (error?.status === 401) return setIsLogout(true);
    }
  };

  if (isLogout) return <Logout />;

  return (
    <List>
      {notifications.map((item) => (
        <NotificationItem key={item.id} item={item} />
      ))}
    </List>
  );
};

function formatData(data: any[]): NotificationType[] {
  if (!Array.isArray(data)) return [];
  const formatNotifications: NotificationType[] = data.map((not) => {
    let type: any;
    let img: string = "";
    switch (not.type) {
      case 0:
        type = "Warning";
        img = warningImg;
        break;
      case 1:
        type = "Announcement";
        img = bellImg;
        break;
    }
    const notification: NotificationType = {
      id: not.id,
      type,
      message: not.message,
      img,
      time: formatDateDifference(new Date(not.date)),
    };
    return notification;
  });
  return formatNotifications;
}
