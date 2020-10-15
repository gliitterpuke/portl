import React from "react";

const sessionRoutes = [
  {
    path: "/session/signup",
    component: React.lazy(() => import("./SignUp")),
  },
  {
    path: "/session/signin",
    component: React.lazy(() => import("./SignIn")),
  },
  {
    path: "/session/forgot-password",
    component: React.lazy(() => import("./ForgotPassword")),
    exact: true
  },
  {
    path: "/session/forgot-password/:token",
    component: React.lazy(() => import("./ResetPassword")),
  },
  {
    path: "/session/404",
    component: React.lazy(() => import("./NotFound")),
  },
  {
    path: "/session/fileupload",
    component: React.lazy(() => import("./FileUpload")),
  },
  {
    path: "/session/filechange",
    component: React.lazy(() => import("./FileChange")),
  },
  // for demo
  {
    path: "/session/demo",
    component: React.lazy(() => import("./Demo")),
  },
];

export default sessionRoutes;
