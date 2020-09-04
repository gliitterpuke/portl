import React from "react";
import { Redirect } from "react-router-dom";
import localStorageService from "./services/localStorageService";

import sessionRoutes from "./views/sessions/SessionRoutes";

import materialRoutes from "./views/material-kit/MaterialRoutes";
import invoiceRoutes from "./views/invoice/InvoioceRoutes";
import formsRoutes from "./views/forms/FormsRoutes";
import chatRoutes from "./views/chat-box/ChatRoutes";
import ListRoute from "./views/list/ListRoute";


import otherRoutes from "./views/others/OtherRoutes";


let user = localStorageService.getItem("auth_user")

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/session/signin" />
  }
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />
  }
];

const routes = [
  ...sessionRoutes,
  ...materialRoutes,
  ...invoiceRoutes,
  ...formsRoutes,
  ...chatRoutes,
  ...otherRoutes,
  ...ListRoute,
  ...redirectRoute,
  ...errorRoute,
];

export default routes;
