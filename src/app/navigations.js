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
  {
    name: "Prodcuts",
    icon: "assignment",
    path: "/products",
    auth: authRoles.client,
  },
  {
    name: "Pricing",
    icon: "dollar",
    path: "/Payment",
    auth: authRoles.client,
    exact: true,
  },
  {
    name: "Payment 2",
    icon: "dollar",
    path: "/Payment2",
    auth: authRoles.client,
    exact: true,
  },
];
