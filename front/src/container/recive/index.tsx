import { useContext, useState } from "react";

import { Field, handlerFieldData } from "../../component/filed";
import { receiveMoney } from "../../services/api";
import { AuthContext } from "../../providers/authProvider";

import { Alert } from "../../component/alert";

import { Header } from "../../component/header";
import { Divider } from "../../component/divider";
import { Logout } from "../logout";
import { List } from "../../component/list";
import { PaymentSystemItem } from "../../component/recive-item";

export const Recive = () => {
  const [sum, setSum] = useState<handlerFieldData>();
  const [isLogout, setIsLogout] = useState<boolean>(false);

  const { state, dispatch } = useContext(AuthContext);
  const [isAlert, setAlert] = useState<{ ok: boolean; message: string }>({
    ok: false,
    message: "",
  });
  const isActive = sum?.isValid;

  const submitHandler = async (id: number) => {
    setAlert({ ok: false, message: "" });
    if (!isActive || !sum?.value)
      return setAlert({ ok: false, message: "Entry sum" });
    if (!state.token) return setIsLogout(true);
    try {
      const value = sum.value;
      const amount = Number(
        value.match("\\.") ? value.replace(".", "") : value + "00"
      );

      const res = await receiveMoney(state.token, amount, id);
      if (!res) return;

      setAlert({ ok: true, message: "Successful" });
    } catch (error: any) {
      if (error && error.message)
        setAlert({ ok: false, message: error.message || error });
      if (error?.status === 401) return setIsLogout(true);
    }
  };

  if (isLogout) return <Logout />;

  return (
    <>
      <Header title="Receive" />
      <h3 className="settings__title">Receive amount</h3>
      <Field name="" type="money" handler={setSum}></Field>

      <Divider />
      <h3 className="settings__title">Payment system</h3>
      <List>
        {PAYMENTS.map((item) => {
          return (
            <PaymentSystemItem
              key={item.id}
              item={item}
              onClick={() => submitHandler(item.id)}
            />
          );
        })}
      </List>
      {isAlert.message && <Alert isOK={isAlert.ok} message={isAlert.message} />}
    </>
  );
};

const PAYMENTS: {
  id: number;
  name: string;
  img: string;
  sub: { id: number; src: string }[];
}[] = [
  {
    id: 0,
    name: "Stipe",
    img: "assets/svg/logo-S.svg",
    sub: [
      { id: 0, src: "assets/svg/logo-1.svg" },
      { id: 1, src: "assets/svg/logo-2.svg" },
      { id: 2, src: "assets/svg/logo-3.svg" },
      { id: 3, src: "assets/svg/logo-4.svg" },
      { id: 4, src: "assets/svg/logo-5.svg" },
    ],
  },
  {
    id: 1,
    name: "Coinbase",
    img: "assets/svg/logo-C.svg",
    sub: [
      { id: 0, src: "assets/svg/logo-2.svg" },
      { id: 1, src: "assets/svg/logo-4.svg" },
      { id: 2, src: "assets/svg/logo-5.svg" },
      { id: 3, src: "assets/svg/logo-1.svg" },
      { id: 4, src: "assets/svg/logo-3.svg" },
    ],
  },
];
