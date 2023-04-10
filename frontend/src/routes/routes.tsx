import { MainLayout } from "layouts";
import { TeamFeature } from "features";

export const routes = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <h1>Dashboard</h1> },
      { path: "/team", element: <TeamFeature /> },
      { path: "/profile", element: <h1>Profile form</h1> },
    ],
  },
];
