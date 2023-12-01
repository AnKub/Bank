import "./index.css";

import { useContext, useEffect, useState } from "react";
import { BalanceHeader } from "../../component/balance-header";
import { BalanceActions } from "../../component/balance-actions";
import { getBalance } from "../../services/api";
import { AUTH_TYPES, AuthContext } from "../../providers/authProvider";
import { Navigate } from "react-router-dom";
import { formatMoney } from "../../utils/formats";

export const Balance = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [nav, setNav] = useState("");
  const [amount, setAmount] = useState(0);

  const handlerSettings = () => {
    setNav("/settings");
  };
  const handlerNotification = () => {
    setNav("/notifications");
  };
  const handlerRecive = () => {
    setNav("/recive");
  };
  const handlerSend = () => {
    setNav("/send");
  };
  useEffect(() => {
    getData();
  }, []);

  const logout = () => {
    setNav("/");
    dispatch({
      type: AUTH_TYPES.LOGOUT,
    });
  };

  const getData = async () => {
    if (!state.token) return logout();
    try {
      const res = await getBalance(state.token);
      if (!res?.count) return;

      setAmount(res.count);
    } catch (error: any) {
      if (error?.status === 401) return logout();
    }
  };

  if (nav) return <Navigate to={nav} />;

  return (
    <div className="balance">
      <BalanceHeader
        handlerSettings={handlerSettings}
        handlerNotification={handlerNotification}
      />
      <span className="balance__amount">{formatMoney(amount)} $</span>
      <BalanceActions handlerRecive={handlerRecive} handlerSend={handlerSend} />
    </div>
  );
};
