import React from "react";

const formsRoutes = [
  {
    path: "/profile",
    component: React.lazy(() => import("./BasicForm"))
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
    path: "/application/trv",
    component: React.lazy(() => import("./WizardForm"))
  }
];

export default formsRoutes;
