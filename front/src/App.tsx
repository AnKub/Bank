import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WelcomePage as WelcomePage } from "./page/welcome";
import { AuthProvider } from "./providers/authProvider";
import { AuthRoute } from "./routes/AuthRoute";
import { PrivateRoute } from "./routes/PrivateRoute";
import { BalancePage } from "./page/balance";
import { ErrorPage } from "./page/error";

import { SendPage } from "./page/send";
import { SettingsPage } from "./page/settings";

import { SignIn } from "./container/sign-in";
import { SignUp } from "./container/sign-up";
import { SignUpConfirm } from "./container/sign-up-confirm";
import { Recovery } from "./container/recovery";
import { RecoveryConfirm } from "./container/recovery-confirm";
import { Transaction } from "./container/transaction";
import { RecivePage } from "./page/recive";
import { NotificationsPage } from "./page/notifications";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <AuthRoute>
                <WelcomePage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignUp />
              </AuthRoute>
            }
          />
          <Route
            path="/signup-confirm"
            element={
              <PrivateRoute>
                <SignUpConfirm />
              </PrivateRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <SignIn />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery"
            element={
              <AuthRoute>
                <Recovery />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery-confirm"
            element={
              <AuthRoute>
                <RecoveryConfirm />
              </AuthRoute>
            }
          />
          <Route
            path="/balance"
            element={
              <PrivateRoute>
                <BalancePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <NotificationsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/recive"
            element={
              <PrivateRoute>
                <RecivePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/send"
            element={
              <PrivateRoute>
                <SendPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/transaction/:id"
            element={
              <PrivateRoute>
                <Transaction />
              </PrivateRoute>
            }
          />
          <Route path="*" Component={ErrorPage} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
