import React from "react";
import { authRoles } from "../../auth/authRoles";

const invoiceRoutes = [
  {
    path: "/invoice/list",
    exact: true,
    component: React.lazy(() => import("./InvoiceList"))
  },
  {
    path: "/invoice/edit/:id",
    component: React.lazy(() => import("./InvoiceList"))
  },
  {
  path: "/application/:id/file/:id",
  component: React.lazy(() => import("./FileDetails.jsx")),
},

];

export default invoiceRoutes;
