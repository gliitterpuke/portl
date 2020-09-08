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
    name: "Pricing",
    icon: "assignment",
    path: "/others/pricing",
    
  },
];
