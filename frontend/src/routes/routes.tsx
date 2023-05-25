import { MainLayout } from "layouts";
import { UsersFeature, EntsFeature, OrganizationsFeature } from "features";

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
