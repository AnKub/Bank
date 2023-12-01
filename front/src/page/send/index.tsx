import React from "react";
import { Send } from "../../container/send";
import { Header } from "../../component/header";
import { PageContent } from "../../component/page-content";

export const SendPage = () => {
  return (
    <div className="page">
      <PageContent gap="12px">
        <Header title="Send" />
        <Send />
      </PageContent>
    </div>
  );
};
