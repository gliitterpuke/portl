import React from "react";
import { authRoles } from "../../auth/authRoles";

const materialRoutes = [
  {
    path: "/application/new",
    component: React.lazy(() => import("./buttons/AppButton")),
  },
];

export default materialRoutes;
