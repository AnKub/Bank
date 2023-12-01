import { useContext, useState } from "react";
import { handlerFieldData } from "../../component/filed";
import { Registration, SendCode } from "../../services/api";
import { Navigate } from "react-router-dom";
import { SignUpConfirmPage } from "../../page/sign-up-confirm";
import { AUTH_TYPES, AuthContext } from "../../providers/authProvider";

export const SignUpConfirm = () => {
  const [code, setCode] = useState<handlerFieldData>();

  const [isAlert, setAlert] = useState<string>("");
  const [confirm, setConfirm] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  const codeHandler = (data: handlerFieldData) => {
    setCode(data);
  };

  const isActive = code?.isValid || false;
  const submitHandler = async () => {
    setAlert("");
    if (!isActive) return;
    try {
      if (!state.user || !code?.value) return;
      const res = await SendCode(state.user.email, code.value);
      if (!res || !state.token) return;
      dispatch({
        type: AUTH_TYPES.LOGIN,
        token: state.token,
        user: res.user,
      });

      setConfirm(true);
    } catch (error: any) {
      if (error && error.message) setAlert(error.message);
    }
  };

  if (confirm) return <Navigate to="/signin" />;
  return (
    <SignUpConfirmPage
      submitHandler={submitHandler}
      codeHandler={codeHandler}
      submitIsActive={isActive}
      isAlert={isAlert}
    />
  );
};
