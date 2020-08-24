import React from "react";

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
    path: "/application",
    component: React.lazy(() => import("./Application"))
  },
  {
  path: "/rawr/:id",
  component: React.lazy(() => import("./FileDetails.jsx"))
},

];

export default invoiceRoutes;
