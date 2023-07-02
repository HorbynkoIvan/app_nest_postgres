import { MainLayout } from "layouts";
import { EntsFeature, OrganizationsFeature } from "features";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <h1>Dashboard</h1> },
      {
        path: "users/*",
        element: <h1>Users</h1>,
      },
      {
        path: "ents/*",
        element: <EntsFeature />,
      },
      {
        path: "organizations/*",
        element: <OrganizationsFeature />,
      },
    ],
  },
];
