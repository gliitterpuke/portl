import React from 'react';
import { authRoles } from "../../auth/authRoles";

const calendarRoutes = [
  {
    path: "/calendar",
    exact: true,
    component: React.lazy(() => import("./MatxCalendar"))
  },
  {
    path: "/event",
    component: React.lazy(() => import("./Event")),
    auth: authRoles.client
  },
];

export default calendarRoutes;
