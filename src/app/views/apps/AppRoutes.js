import React from "react";
import { authRoles } from "../../auth/authRoles";

const appRoutes = [
  {
    path: "/application/:id/file/:id",
    component: React.lazy(() => import("./FileViewer.jsx")),
    exact: true,
  },
  {
    path: "/trv",
    component: React.lazy(() => import("../payments/pages/index")),
    auth: authRoles.client
  },
  {
    path: "/application/:id/addons/consultation",
    component: React.lazy(() => import("../payments/pages/addon")),
    auth: authRoles.client
  },
  {
    path: "/application/:id/addons",
    component: React.lazy(() => import("./AddOns")),
    auth: authRoles.client
  },
];

export default appRoutes;
