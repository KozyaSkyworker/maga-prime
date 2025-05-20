import { createHashRouter, RouteObject } from "react-router-dom";

import { Exercise } from "../screens/exercise";
import { Report } from "../screens/report";
import { Create } from "../screens/create";
import { Home } from "../screens/home";

import { LayoutInner } from "../widgets/layout-inner";
import { Layout } from "../widgets/layout";

import { ROUTES } from "../shared/routes";

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <LayoutInner />,
        children: [
          {
            path: ROUTES.EXERCISE,
            element: <Exercise />,
          },
          {
            path: ROUTES.CREATE,
            element: <Create />,
          },
          {
            path: ROUTES.REPORT,
            element: <Report />,
          },
        ],
      },
    ],
  },
];

export const router = createHashRouter(routes);
