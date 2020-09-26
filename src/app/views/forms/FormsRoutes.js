import React from "react";
import { authRoles } from "../../auth/authRoles";

const formsRoutes = [
  {
    path: "/profile",
    component: React.lazy(() => import("../profile/SimpleForm")),
  },
  {
    path: "/forms/editor",
    component: React.lazy(() => import("./EditorForm"))
  },
  {
    path: "/forms/upload",
    component: React.lazy(() => import("./UploadForm"))
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
