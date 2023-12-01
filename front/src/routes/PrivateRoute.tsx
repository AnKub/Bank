import React, { useContext, useState } from "react";
import { AuthContext, AUTH_TYPES } from "../providers/authProvider";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }: any) => {
  const { state, dispatch } = useContext(AuthContext);
  const location = useLocation();

  console.log(location.pathname);
  if (!state.token) return <Navigate to={"/"} />;

  if (!state.user?.isConfirm && location.pathname !== "/signup-confirm")
    return <Navigate to="/signup-confirm" />;

  return <div>{children}</div>;
};
