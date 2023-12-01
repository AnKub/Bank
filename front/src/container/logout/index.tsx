import "./index.css";

import { useContext } from "react";

import { AUTH_TYPES, AuthContext } from "../../providers/authProvider";
import { Navigate } from "react-router-dom";

export const Logout = () => {
  const { dispatch } = useContext(AuthContext);
  dispatch({ type: AUTH_TYPES.LOGOUT });

  return <Navigate to="/" />;
};
