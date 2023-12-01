import "./index.css";
import { Balance } from "../../container/balance";
import { TransactionList } from "../../container/transaction-list";
import { PageContent } from "../../component/page-content";

export const BalancePage = () => {
  return (
    <div className="page balance__page">
      <Balance />
      <TransactionList />
    </div>
  );
};
