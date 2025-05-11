import { createBrowserRouter, RouteObject } from "react-router-dom";
import { ROUTES } from "../shared/routes";
import { Layout } from "../widgets/layout";
import { Home } from "../screens/home";
import { Item } from "../screens/item";

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES.EXERCISE,
        element: <Item />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
