import "../fake-db";
import "../styles/_app.scss";
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Provider } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";
import sessionRoutes from "./views/sessions/SessionRoutes";
import MatxTheme from "./MatxLayout/MatxTheme/MatxTheme";
import { AuthProvider } from "app/contexts/JWTAuthContext";
import AppContext from "./appContext";
import history from "history.js";

import routes from "./RootRoutes";
import { Store } from "./redux/Store";
import GlobalCss from "../matx/styles/GlobalCss";
import Auth from "./auth/Auth";
import MatxLayout from "./MatxLayout/MatxLayoutSFC";
import AuthGuard from "./auth/AuthGuard";
import axios from "axios";
import MatxSuspense from "../matx/components/MatxSuspense/MatxSuspense";

const App = () => {
  return (
    <AppContext.Provider value={{ routes }}>
      <Provider store={Store}>
        <MatxTheme>
          <GlobalCss>
          {/* <Auth> */}
            <Router history={history}>
              <AuthProvider>
                <MatxSuspense>
                  <Switch>
                    {/* AUTHENTICATION PAGES */}
                    {sessionRoutes.map((item, ind) => (
                      <Route
                        key={ind}
                        path={item.path}
                        component={item.component}
                      />
                    ))}
                    {/* AUTH PROTECTED PAGES */}
                    <AuthGuard>
                      <MatxLayout />
                    </AuthGuard>
                  </Switch>
                </MatxSuspense>
              </AuthProvider>
            </Router>
          {/* </Auth> */}
          </GlobalCss>
        </MatxTheme>
      </Provider>
    </AppContext.Provider>
  );
};

export default App;
