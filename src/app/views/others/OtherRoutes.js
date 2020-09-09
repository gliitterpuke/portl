import React from 'react';

const otherRoutes = [
  {
    path: "/products",
    component: React.lazy(() => import("./Pricing"))
  }
];

export default otherRoutes;
