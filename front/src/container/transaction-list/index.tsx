import "./index.css";

import { useContext, useEffect, useState } from "react";

import { getTransactions } from "../../services/api";
import { AUTH_TYPES, AuthContext } from "../../providers/authProvider";
import { Navigate } from "react-router-dom";
import { List } from "../../component/list";
import { TransactionItem } from "../../component/transaction-item";
import { extractTimeFromDate, formatMoney } from "../../utils/formats";
import { TransactionType } from "../transaction";

export const TransactionList = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [nav, setNav] = useState("");
  const [transactions, setTransactions] = useState<TransactionType[]>();

  useEffect(() => {
    getData();
  }, []);

  const logout = () => {
    setNav("/");
    dispatch({
      type: AUTH_TYPES.LOGOUT,
    });
  };

  const selectItemHandler = (id: number) => {
    setNav("/transaction/" + id);
  };

  const getData = async () => {
    if (!state.token) return logout();
    try {
      const res = await getTransactions(state.token);

      if (!res.data) return;

      setTransactions(formatData(res.data));
    } catch (error: any) {
      if (error?.status === 401) return logout();
    }
  };

  if (nav) return <Navigate to={nav} />;

  return (
    <List style={{ padding: "20px" }}>
      {transactions?.map((item) => {
        return (
          <TransactionItem
            onClick={() => selectItemHandler(item.id || 0)}
            key={item.id}
            item={item}
          />
        );
      })}
    </List>
  );
};

const formatData = (data: any): TransactionType[] => {
  if (!Array.isArray(data)) return [];

  const transactions: TransactionType[] = [];

  data.forEach((item) => {
    transactions.push({
      id: item.id,
      type: item.type === "RECIVE" ? "Receipt" : "Sending",
      user: item.username || "",
      img: item.img || "",
      amount: formatMoney(Number(item.amount) || 0),
      time: extractTimeFromDate(new Date(item.date)) || "",
    });
  });

  return transactions;
};
