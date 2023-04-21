import { MainLayout } from "layouts";
import { UsersFeature } from "features";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <h1>Dashboard</h1> },
      {
        path: "users/*",
        element: <UsersFeature />,
      },
    ],
  },
];
