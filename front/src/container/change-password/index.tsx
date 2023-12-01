import { useContext, useState } from "react";
import { SignInPage } from "../../page/sign-in";
import { Field, handlerFieldData } from "../../component/filed";
import { ChangeEmailApi, ChangePasswordApi, Login } from "../../services/api";
import { AUTH_TYPES, AuthContext } from "../../providers/authProvider";
import { Navigate } from "react-router-dom";
import { Alert } from "../../component/alert";
import { Button } from "../../component/button";

export const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState<handlerFieldData>();
  const [newPassword, setNewPassword] = useState<handlerFieldData>();

  const [nav, setNav] = useState("");
  const { state, dispatch } = useContext(AuthContext);

  const newPasswordHandler = (data: handlerFieldData) => {
    setNewPassword(data);
  };

  const oldPasswordHandler = (data: handlerFieldData) => {
    setOldPassword(data);
  };

  const isActive = (oldPassword?.isValid && newPassword?.isValid) || false;

  const submitHandler = async () => {
    if (!isActive || !newPassword?.value || !oldPassword?.value) return;
    if (!state.token) return logout();
    try {
      const res = await ChangePasswordApi(
        state.token,
        newPassword.value,
        oldPassword.value
      );
      if (!res) return;

      dispatch({ type: AUTH_TYPES.LOGIN, token: res.token, user: res.user });
      alert("Password updated");
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
      <Field name="Old password" handler={oldPasswordHandler} type="password" />
      <Field name="New password" handler={newPasswordHandler} type="password" />
      <Button
        isOutside
        style={{ height: "46px" }}
        isActive={isActive}
        onClick={submitHandler}
      >
        Save password
      </Button>
    </>
  );
};
