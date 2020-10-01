import React from "react";
import { authRoles } from "../../auth/authRoles";
import localStorageService from "../../services/localStorageService"

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
  {
    path: "/test",
    component: React.lazy(() => import("./testuserform.jsx")),
    exact: true,
  },
];

export default formsRoutes;
