import { MainLayout } from "layouts";
import { TeamFeature, ProfileFeature, UserEditFeature } from "features";

export const routes = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <h1>Dashboard</h1> },
      {
        path: "/team",
        children: [
          { path: "", element: <TeamFeature /> },
          { path: ":userId", element: <UserEditFeature /> },
        ],
      },
      { path: "/profile", element: <ProfileFeature /> },
    ],
  },
];
