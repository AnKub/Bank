
import { useContext, useState } from "react";
import { handlerFieldData } from "../../component/filed";
import { SignUpPage } from "../../page/sign-up";
import { Registration } from "../../services/api";
import { Navigate, redirect } from "react-router-dom";
import { AUTH_TYPES, AuthContext } from "../../providers/authProvider";

export const SignUp = () => {
  const [email, setEmail] = useState<handlerFieldData>();
  const [password, setPassword] = useState<handlerFieldData>();
  const [isAlert, setAlert] = useState<string>("");
  const [confirm, setConfirm] = useState(false);

  // const state = useContext();
  const { state, dispatch } = useContext(AuthContext);

  const emailHandler = (data: handlerFieldData) => {
    setEmail(data);
  };
  const passwordHandler = (data: handlerFieldData) => {
    setPassword(data);
  };
  const isActive = (email?.isValid && password?.isValid) || false;
  const submitHandler = async () => {
    console.log(state);
    setAlert("");
    if (!isActive || !email?.value || !password?.value) return;

    try {
      const res = await Registration(email.value, password.value);
      if (!res) return;

      dispatch({ type: AUTH_TYPES.LOGIN, token: res.token, user: res.user });
      setConfirm(true);
    } catch (error: any) {
      if (error && error.message) setAlert(error.message);
    }
  };
  if (confirm) return <Navigate to="/signup-confirm" />;

  return (
    <SignUpPage
      submitHandler={submitHandler}
      emailHandler={emailHandler}
      passwordHandler={passwordHandler}
      submitIsActive={isActive}
      isAlert={isAlert}
    />
  );
};
