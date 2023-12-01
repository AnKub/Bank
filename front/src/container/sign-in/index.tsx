import { useContext, useState } from "react";
import { SignInPage } from "../../page/sign-in";
import { handlerFieldData } from "../../component/filed";
import { Login } from "../../services/api";
import { AUTH_TYPES, AuthContext } from "../../providers/authProvider";
import { Navigate } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState<handlerFieldData>();
  const [password, setPassword] = useState<handlerFieldData>();
  const [isAlert, setAlert] = useState<string>("");
  const [confirm, setConfirm] = useState(false);

  const { state, dispatch } = useContext(AuthContext);

  const emailHandler = (data: handlerFieldData) => {
    setEmail(data);
  };

  const passwordHandler = (data: handlerFieldData) => {
    setPassword(data);
  };

  const isActive = (email?.isValid && password?.isValid) || false;
  const submitHandler = async () => {
    setAlert("");
    if (!isActive || !email?.value || !password?.value) return;

    try {
      const res = await Login(email.value, password.value);
      if (!res) return;

      dispatch({ type: AUTH_TYPES.LOGIN, token: res.token, user: res.user });
      setConfirm(true);
    } catch (error: any) {
      if (error && error.message) setAlert(error.message);
    }
  };
  if (confirm) return <Navigate to="/balance" />;

  return (
    <SignInPage
      submitHandler={submitHandler}
      emailHandler={emailHandler}
      passwordHandler={passwordHandler}
      submitIsActive={isActive}
      isAlert={isAlert}
    />
  );
};
