import React from "react";
import { authRoles } from "../../auth/authRoles";

const formsRoutes = [
  {
    path: "/profile",
    component: React.lazy(() => import("../material-kit/forms/SimpleForm")),
    auth: authRoles.client
  },
  {
    path: "/professional",
    component: React.lazy(() => import("../material-kit/forms/ProfessionalForm.jsx")),
    auth: authRoles.professional
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
    component: React.lazy(() => import("../invoice/Application.jsx")),
    auth: authRoles.client
  },
];

export default formsRoutes;
