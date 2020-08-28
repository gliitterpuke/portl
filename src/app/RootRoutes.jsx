import React from "react";
import { Redirect } from "react-router-dom";

import sessionRoutes from "./views/sessions/SessionRoutes";

import materialRoutes from "./views/material-kit/MaterialRoutes";
import invoiceRoutes from "./views/invoice/InvoioceRoutes";
import formsRoutes from "./views/forms/FormsRoutes";
import chatRoutes from "./views/chat-box/ChatRoutes";
import ListRoute from "./views/list/ListRoute";


import otherRoutes from "./views/others/OtherRoutes";

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/profile" />
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
  ...errorRoute
];

export default routes;
