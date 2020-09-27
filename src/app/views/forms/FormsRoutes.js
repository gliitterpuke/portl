import React from "react";
import { authRoles } from "../../auth/authRoles";
import localStorageService from "../../services/localStorageService"

const settings = {
  activeLayout: "layout1",
  layout1Settings: {
    topbar: {
      show: true
    },
    leftSidebar: {
      show: true,
      mode: "compact"
    },
    navbar: { show: true }
  },
  secondarySidebar: { show: false },
  footer: { show: false }
};

const formsRoutes = [
  {
    path: "/profile",
    component: React.lazy(() => import("../profile/SimpleForm")),
  },
  {
    path: "/application/:id/trv/",
    component: React.lazy(() => import("./UserForm")),
    auth: authRoles.client
  },
  {
    path: "/application/:id",
    component: React.lazy(() => import("../apps/Application.jsx")),
    exact: true,
  },
];

export default formsRoutes;
