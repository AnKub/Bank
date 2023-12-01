import "./index.css";
import React, { useState } from "react";

import { PageContent } from "../../component/page-content";
import { Header } from "../../component/header";
import { ChangeEmail } from "../../container/change-email";
import { Divider } from "../../component/divider";
import { ChangePassword } from "../../container/change-password";
import { Button } from "../../component/button";
import { Logout } from "../../container/logout";

export const SettingsPage = () => {
  const [isLogout, setIsLogout] = useState<boolean>(false);
  if (isLogout) return <Logout />;
  return (
    <div className="page">
      <PageContent gap="12px">
        <Header title="Settings" />
        <h3 className="settings__title">Change email</h3>
        <ChangeEmail />
        <Divider />
        <h3 className="settings__title">Change password</h3>
        <ChangePassword />
        <Divider />
        <Button
          style={{ height: "46px" }}
          onClick={() => setIsLogout(true)}
          isOutside
          color="#F23152"
        >
          Log out
        </Button>
      </PageContent>
    </div>
  );
};
