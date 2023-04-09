import { MainLayout } from "layouts";
import { Team } from "features";

export const routes = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <h1>Dashboard</h1> },
      { path: "/team", element: <Team /> },
      { path: "/profile", element: <h1>Profile form</h1> },
    ],
  },
];
