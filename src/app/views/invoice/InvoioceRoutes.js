import React from "react";

const invoiceRoutes = [
  {
    path: "/invoice/list",
    exact: true,
    component: React.lazy(() => import("./InvoiceList"))
  },
  {
    path: "/invoice/:id",
    component: React.lazy(() => import("./InvoiceDetails"))
  },
  {
    path: "/invoice/edit/:id",
    component: React.lazy(() => import("./InvoiceList"))
  },
  {
    path: "/application",
    component: React.lazy(() => import("./Application"))
  },
  {
    path: "/application/:id",
    component: React.lazy(() => import("./FileDetails"))
  },
  {
    path: "/application/edit/:id",
    component: React.lazy(() => import("./Application"))
  },
];

export default invoiceRoutes;
