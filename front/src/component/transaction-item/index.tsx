import { TransactionType } from "../../container/transaction";
import "./index.css";

import { MouseEventHandler } from "react";

export const TransactionItem = ({
  item,
  onClick,
}: {
  item: TransactionType;
  onClick: MouseEventHandler<HTMLDivElement>;
}) => {
  const [money, coins] = item.amount.split(".");

  return (
    <div onClick={onClick} className="transaction__item click">
      <img src={item.img} alt="test" />
      <div className="transaction__info">
        <h3 className="transaction__name">{item.user}</h3>
        <span className="transaction__type">{item.time + " " + item.type}</span>
      </div>
      <div
        className={`transaction__amount  transaction__amount--${
          item.type === "Receipt" ? "receipt" : "sending"
        }`}
      >
        <span>{money}</span>.<span>{coins}</span>
      </div>
    </div>
  );
};
