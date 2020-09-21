import SignUp from "./SignUp";
import SignIn from "./SignIn";
import NotFound from "./NotFound";
import ForgotPassword from "./ForgotPassword";
import RepSignUp from "./RepSignUp";
import RepSignIn from "./RepSignIn";
import ResetPassword from "./ResetPassword"
import FileUpload from "./FileUpload"
import FileChange from "./FileChange"

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
    component: SignUp,
    settings
  },
  {
    path: "/session/signin",
    component: SignIn,
    settings
  },
  {
    path: "/session/forgot-password",
    component: ForgotPassword,
    settings,
    exact: true
  },
  {
    path: "/session/forgot-password/:token",
    component: ResetPassword,
    settings
  },
  {
    path: "/session/404",
    component: NotFound,
    settings
  },
  {
    path: "/session/repsignup",
    component: RepSignUp,
    settings
  },
  {
    path: "/session/repsignin",
    component: RepSignIn,
    settings
  },
  {
    path: "/session/fileupload",
    component: FileUpload,
    settings
  },
  {
    path: "/session/filechange",
    component: FileChange,
    settings
  },
];

export default sessionRoutes;
