import { useContext, useState } from "react";
import { handlerFieldData } from "../../component/filed";
import { SendCode, SendRecoveryCode } from "../../services/api";
import { Navigate } from "react-router-dom";

import { AUTH_TYPES, AuthContext } from "../../providers/authProvider";
import { RecoveryConfirmPage } from "../../page/recovery-confirm";

export const RecoveryConfirm = () => {
  const [code, setCode] = useState<handlerFieldData>();
  const [password, setPassword] = useState<handlerFieldData>();

  const [alert, setAlert] = useState<string>("");
  const [confirm, setConfirm] = useState(false);

  const codeHandler = (data: handlerFieldData) => {
    setCode(data);
  };
  const passwordHandler = (data: handlerFieldData) => {
    setPassword(data);
  };

  const isActive = code?.isValid || password?.isValid || false;

  const submitHandler = async () => {
    setAlert("");
    if (!isActive || !code?.value || !password?.value) return;
    try {
      const res = await SendRecoveryCode(password?.value, code?.value);
      if (!res) return;
      setConfirm(true);
    } catch (error: any) {
      if (error && error.message) setAlert(error.message);
    }
  };

  if (confirm) return <Navigate to="/signin" />;
  return (
    <RecoveryConfirmPage
      passwordHandler={passwordHandler}
      codeHandler={codeHandler}
      submitHandler={submitHandler}
      submitIsActive={isActive}
      isAlert={alert}
    />
  );
};
