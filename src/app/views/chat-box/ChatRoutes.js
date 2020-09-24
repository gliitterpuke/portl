import React from 'react';

const chatRoutes = [
  {
    path: "/messages",
    component: React.lazy(() => import("./AppChat"))
  }
];

export default chatRoutes;
