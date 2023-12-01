import "./index.css";
import { Header } from "../../component/header";
import { PageContent } from "../../component/page-content";
import { Notifications } from "../../container/notifications";

export const NotificationsPage = () => {
  return (
    <div className="page">
      <PageContent>
        <Header title="Notifications" />
        <Notifications />
      </PageContent>
    </div>
  );
};
