import React from "react";
import { authRoles } from "../../auth/authRoles";

const invoiceRoutes = [
  {
    path: "/application/:id/file/:id",
    component: React.lazy(() => import("./FileViewer.jsx")),
    exact: true,
  },
  {
    path: "/applications/:id",
    component: React.lazy(() => import("../Applications/ProfessionalApplication.jsx")),
    exact: true,
    auth: authRoles.professional
  },
  {
    path: "/payment",
    component: React.lazy(() => import("../payments/pages/index"))
  },
  {
    path: "/payment2",
    component: React.lazy(() => import("../payments/stripedemo"))
  },
  {
    path: "/applications/:id/files/:id",
    component: React.lazy(() => import("../Applications/ProfessionalFileViewer.jsx")),
    exact: true,
    auth: authRoles.professional
  },
];

export default invoiceRoutes;
