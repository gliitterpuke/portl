import React from "react";

const settings = {
  activeLayout: "layout1",
  layout1Settings: {
    topbar: {
      show: false
    },
    leftSidebar: {
      show: false,
      mode: "close"
    }
  },
  layout2Settings: {
    mode: "full",
    topbar: {
      show: false
    },
    navbar: { show: false }
  },
  secondarySidebar: { show: false },
  footer: { show: false }
};

const sessionRoutes = [
  {
    path: "/session/signup",
    component: React.lazy(() => import("./SignUp")),
    settings
  },
  {
    path: "/session/signin",
    component: React.lazy(() => import("./SignIn")),
    settings
  },
  {
    path: "/session/forgot-password",
    component: React.lazy(() => import("./ForgotPassword")),
    settings,
    exact: true
  },
  {
    path: "/session/forgot-password/:token",
    component: React.lazy(() => import("./ResetPassword")),
    settings
  },
  {
    path: "/session/404",
    component: React.lazy(() => import("./NotFound")),
    settings
  },
  {
    path: "/session/fileupload",
    component: React.lazy(() => import("./FileUpload")),
    settings
  },
  {
    path: "/session/filechange",
    component: React.lazy(() => import("./FileChange")),
    settings
  },
  // for demo
  {
    path: "/session/demo",
    component: React.lazy(() => import("./Demo")),
    settings
  },
];

export default sessionRoutes;
