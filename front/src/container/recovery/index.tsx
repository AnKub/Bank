import { useContext, useState } from "react";
import { handlerFieldData } from "../../component/filed";

import { RecoveryPassword, Registration } from "../../services/api";
import { Navigate } from "react-router-dom";
import { AUTH_TYPES, AuthContext } from "../../providers/authProvider";
import { RecoveryPage } from "../../page/recovery";

export const Recovery = () => {
  const [email, setEmail] = useState<handlerFieldData>();
  const [password, setPassword] = useState<handlerFieldData>();
  const [alert, setAlert] = useState<string>("");
  const [confirm, setConfirm] = useState(false);

  // const state = useContext();
  const { state, dispatch } = useContext(AuthContext);

  const emailHandler = (data: handlerFieldData) => {
    setEmail(data);
  };

  const isActive = email?.isValid || false;

  const submitHandler = async () => {
    setAlert("");
    if (!isActive || !email?.value) return;

    try {
      const res = await RecoveryPassword(email.value);
      if (!res) return;
      setConfirm(true);
    } catch (error: any) {
      if (error && error.message) setAlert(error.message);
    }
  };
  if (confirm) return <Navigate to="/recovery-confirm" />;

  return (
    <RecoveryPage
      emailHandler={emailHandler}
      submitHandler={submitHandler}
      submitIsActive={isActive}
      isAlert={alert}
    />
  );
};
