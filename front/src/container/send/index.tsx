import { useContext, useState } from "react";
import { SignInPage } from "../../page/sign-in";
import { Field, handlerFieldData } from "../../component/filed";
import { ChangeEmailApi, Login, sendMoney } from "../../services/api";
import { AUTH_TYPES, AuthContext } from "../../providers/authProvider";
import { Navigate } from "react-router-dom";
import { Alert } from "../../component/alert";
import { Button } from "../../component/button";
import { Logout } from "../logout";

export const Send = () => {
  const [email, setEmail] = useState<handlerFieldData>();
  const [sum, setSum] = useState<handlerFieldData>();
  const [isLogout, setIsLogout] = useState<boolean>(false);

  const { state, dispatch } = useContext(AuthContext);
  const [isAlert, setAlert] = useState<{ ok: boolean; message: string }>({
    ok: false,
    message: "",
  });

  const emailHandler = (data: handlerFieldData) => {
    setEmail(data);
  };

  const sumHandler = (data: handlerFieldData) => {
    setSum(data);
  };

  const isActive = (email?.isValid && sum?.isValid) || false;

  const submitHandler = async () => {
    if (!isActive || !email?.value || !sum?.value) return;
    if (!state.token) return setIsLogout(true);
    try {
      const value = sum.value;

      const amount = Number(
        value.match("\\.") ? value.replace(".", "") : value + "00"
      );

      const res = await sendMoney(state.token, amount, email.value);
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
      <Field name="Email" handler={emailHandler} type="email" />
      <Field type="money" name="Sum" handler={sumHandler} />
      <Button
        style={{ height: "46px" }}
        isActive={isActive}
        onClick={submitHandler}
      >
        Save email
      </Button>
      {isAlert.message && <Alert isOK={isAlert.ok} message={isAlert.message} />}
    </>
  );
};
