import { MainLayout } from "layouts";
import { UsersFeature, UserCreateFeature, UserEditFeature } from "features";

export const routes = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <h1>Dashboard</h1> },
      {
        path: "/users",
        children: [
          { path: "", element: <UsersFeature /> },
          { path: ":userId", element: <UserEditFeature /> },
        ],
      },
      { path: "/userCreate", element: <UserCreateFeature /> },
    ],
  },
];
