import { authRoles } from "./auth/authRoles";
import localStorageService from "./services/localStorageService"

export const navigations = [
  {
    name: "Home",
    path: "/profile",
    icon: "house",
    auth: authRoles.client
  },
  {
    name: "Home",
    path: "/professional",
    icon: "house",
    auth: authRoles.professional
  },
  {
    name: "Chat",
    icon: "chat",
    path: "/chat",
    
  },
  // {
  //   name: "Prodcuts",
  //   icon: "assignment",
  //   path: "/products",
  //   auth: authRoles.client,
  // },
  // {
  //   name: "Pricing",
  //   icon: "payment",
  //   path: "/trv",
  //   auth: authRoles.client,
  //   exact: true,
  // },
  // {
  //   name: "Pricing",
  //   icon: "dollar",
  //   path: "/study",
  //   auth: authRoles.client,
  //   exact: true,
  // },
  // {
  //   name: "Pricing",
  //   icon: "dollar",
  //   path: "/ee",
  //   auth: authRoles.client,
  //   exact: true,
  // },
  // {
  //   name: "Pricing",
  //   icon: "dollar",
  //   path: "/work",
  //   auth: authRoles.client,
  //   exact: true,
  // },
];
