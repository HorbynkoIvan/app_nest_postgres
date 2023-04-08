import { MainLayout } from "layouts";

export const routes = [
  {
    element: <MainLayout />,
    children: [{ path: "/", element: <h1>Dashboard</h1> }],
  },
];
