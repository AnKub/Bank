import "./index.css";

import { useContext, useEffect, useState } from "react";

import { getTransactionItem, getTransactions } from "../../services/api";
import { AUTH_TYPES, AuthContext } from "../../providers/authProvider";
import { Navigate, useParams } from "react-router-dom";

import { formatDateAndTime, formatMoney } from "../../utils/formats";
import { TransactionPage } from "../../page/transaction";

export type TransactionType = {
  id?: number;
  type: "Receipt" | "Sending";
  amount: string;
  user?: string;
  img?: string;
  time: string;
  email?: string;
};

export const Transaction = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [nav, setNav] = useState("");
  const { id } = useParams();
  const [transaction, setTransaction] = useState<TransactionType>();

  useEffect(() => {
    if (id) getData(Number(id));
  }, []);

  const logout = () => {
    dispatch({
      type: AUTH_TYPES.LOGOUT,
    });
    setNav("/");
  };

  const getData = async (id: number) => {
    if (!state.token) return logout();
    try {
      const res = await getTransactionItem(state.token, id);

      if (!res.data) return;

      setTransaction(formatData(res.data));
    } catch (error: any) {
      if (error?.status === 401) return logout();
    }
  };

  if (nav) return <Navigate to={nav} />;

  return (
    <TransactionPage
      amount={transaction?.amount || "0"}
      email={transaction?.email}
      time={transaction?.time || "0"}
      type={transaction?.type || "Receipt"}
    />
  );
};

const formatData = (data: any): TransactionType => {
  const transaction: TransactionType = {
    id: data.id,
    type: data.type === "RECIVE" ? "Receipt" : "Sending",
    user: data.username || "",
    email: data.email,
    amount: formatMoney(Number(data.amount) || 0),
    time: formatDateAndTime(new Date(data.date)) || "",
  };

  return transaction;
};
