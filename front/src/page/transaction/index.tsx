import "./index.css";
import { TransactionType } from "../../container/transaction";
import { Header } from "../../component/header";
import { PageContent } from "../../component/page-content";
import { Divider } from "../../component/divider";

export const TransactionPage = ({
  type,
  amount,
  time,
  email,
}: TransactionType) => {
  return (
    <div className="page">
      <PageContent>
        <Header title="Transaction" />
        <div className="transaction__full">
          <h1
            className={`transaction__full__amount 
          transaction__full__amount--${
            type === "Sending" ? "sending" : "recive"
          }
          `}
          >
            {amount}
          </h1>
          <div className="transaction__full__info">
            <div className="transaction__full__item">
              <span>Date</span>
              <span>{time}</span>
            </div>
            <Divider />
            <div className="transaction__full__item">
              <span>Address</span>
              <span>{email}</span>
            </div>
            <Divider />
            <div className="transaction__full__item">
              <span>Type</span>
              <span>{type}</span>
            </div>
          </div>
        </div>
      </PageContent>
    </div>
  );
};
