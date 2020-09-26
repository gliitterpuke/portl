import React from "react";
import { Redirect } from "react-router-dom";

import sessionRoutes from "./views/sessions/SessionRoutes";

import appRoutes from "./views/apps/AppRoutes";
import formsRoutes from "./views/forms/FormsRoutes";
import chatRoutes from "./views/chat-box/ChatRoutes";
import calendarRoutes from "./views/calendar/CalendarRoutes";

import otherRoutes from "./views/others/OtherRoutes";

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
  ...calendarRoutes,
  ...appRoutes,
  ...formsRoutes,
  ...chatRoutes,
  ...otherRoutes,
  ...redirectRoute,
  ...errorRoute,
];

export default routes;