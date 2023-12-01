import { stat } from "fs";
import { Dispatch, createContext, useReducer } from "react";

interface AuthState {
  token: string | null;
  user: User | null;
}
interface User {
  email: string;
  isConfirm: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const AUTH_KEY = "AUTH_KEY";

export enum AUTH_TYPES {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

type AuthAction =
  | { type: typeof AUTH_TYPES.LOGIN; token: string; user: User }
  | { type: typeof AUTH_TYPES.LOGOUT };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AUTH_TYPES.LOGIN:
      localStorage.setItem(
        AUTH_KEY,
        JSON.stringify({ token: action.token, user: action.user })
      );
      return { ...state, token: action.token, user: action.user };

    case AUTH_TYPES.LOGOUT:
      localStorage.removeItem(AUTH_KEY);
      return { ...initialState };
  }
}
interface AuthContextProps {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextProps>({
  state: initialState,
  dispatch: function (value: AuthAction): void {
    return;
  },
});

export const AuthProvider = ({ children }: any) => {
  const storedData = localStorage.getItem(AUTH_KEY);
  const initialData = storedData ? JSON.parse(storedData) : initialState;

  const [state, dispatch] = useReducer(authReducer, initialData);
  console.log(state);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
