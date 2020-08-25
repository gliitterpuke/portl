import React from "react";

const formsRoutes = [
  {
    path: "/profile",
    component: React.lazy(() => import("../material-kit/forms/SimpleForm"))
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
    path: "/trv",
    component: React.lazy(() => import("./WizardForm"))
  },
  {
    path: "/application/:id",
    component: React.lazy(() => import("../invoice/Application.jsx"))
  },
];

export default formsRoutes;
