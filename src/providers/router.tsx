import { createHashRouter, RouteObject } from "react-router-dom";

import { Home } from "../screens/home";

import { Layout } from "../widgets/layout";

import { ROUTES } from "../shared/routes";
import { Exercise } from "../screens/exercise";

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES.EXERCISE,
        element: <Exercise />,
      },
    ],
  },
];

export const router = createHashRouter(routes);
