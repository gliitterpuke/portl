import React from "react";
import { authRoles } from "../../auth/authRoles";

const invoiceRoutes = [
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
];

export default invoiceRoutes;
