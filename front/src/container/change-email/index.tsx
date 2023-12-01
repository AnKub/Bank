import { useContext, useState } from "react";
import { SignInPage } from "../../page/sign-in";
import { Field, handlerFieldData } from "../../component/filed";
import { ChangeEmailApi, Login } from "../../services/api";
import { AUTH_TYPES, AuthContext } from "../../providers/authProvider";
import { Navigate } from "react-router-dom";
import { Alert } from "../../component/alert";
import { Button } from "../../component/button";

export const ChangeEmail = () => {
  const [email, setEmail] = useState<handlerFieldData>();
  const [password, setPassword] = useState<handlerFieldData>();

  const [nav, setNav] = useState("");
  const { state, dispatch } = useContext(AuthContext);

  const emailHandler = (data: handlerFieldData) => {
    setEmail(data);
  };

  const passwordHandler = (data: handlerFieldData) => {
    setPassword(data);
  };

  const isActive = (email?.isValid && password?.isValid) || false;

  const submitHandler = async () => {
    if (!isActive || !email?.value || !password?.value) return;
    if (!state.token) return logout();
    try {
      const res = await ChangeEmailApi(
        state.token,
        email.value,
        password.value
      );
      if (!res) return;
      dispatch({ type: AUTH_TYPES.LOGIN, token: res.token, user: res.user });
      alert("Email updated");
    } catch (error: any) {
      if (error && error.message) alert(error.message);
      if (error?.status === 401) return logout();
    }
  };

  const logout = () => {
    setNav("/");
    dispatch({
      type: AUTH_TYPES.LOGOUT,
    });
  };

  if (nav) return <Navigate to={nav} />;

  return (
    <>
      <Field name="New email" handler={emailHandler} type="email" />
      <Field name="Password" handler={passwordHandler} type="password" />
      <Button
        style={{ height: "46px" }}
        isOutside
        isActive={isActive}
        onClick={submitHandler}
      >
        Save email
      </Button>
    </>
  );
};
