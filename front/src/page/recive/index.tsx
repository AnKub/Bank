import "./index.css";

import { PageContent } from "../../component/page-content";

import { Recive } from "../../container/recive";

export const RecivePage = () => {
  return (
    <div className="page">
      <PageContent gap="12px">
        <Recive />
      </PageContent>
    </div>
  );
};
