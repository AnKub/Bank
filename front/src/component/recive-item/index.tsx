import { TransactionType } from "../../container/transaction";
import "./index.css";

import { MouseEventHandler } from "react";

export const PaymentSystemItem = ({
  item,
  onClick,
}: {
  item: any;
  onClick: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div className="click system" onClick={onClick} key={item.id}>
      <img className="system__img" src={item.img} alt="" />
      <span className="system__name">{item.name}</span>
      <div className="system__sub">
        {item.sub.map((sub: any) => (
          <img key={sub.id} src={sub.src}></img>
        ))}
      </div>
    </div>
  );
};
