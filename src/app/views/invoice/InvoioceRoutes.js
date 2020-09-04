import React from "react";
import { authRoles } from "../../auth/authRoles";

const invoiceRoutes = [
  {
    path: "/application/:id/file/:id",
    component: React.lazy(() => import("./FileViewer.jsx")),
  },
  {
    path: "/applications/:id",
    component: React.lazy(() => import("../Applications/ProfessionalApplication.jsx")),
    auth: authRoles.professional
  },
  {
    path: "/payment",
    component: React.lazy(() => import("./PaymentTest"))
  },
  {
    path: "/checkout",
    component: React.lazy(() => import("./pages/index.js"))
  },
  {
    path: "/payment2",
    component: React.lazy(() => import("./Payment2"))
  },
  {
    path: "/applications/:id/files/:id",
    component: React.lazy(() => import("../Applications/ProfessionalFileViewer.jsx")),
    auth: authRoles.professional
  },
];

export default invoiceRoutes;
