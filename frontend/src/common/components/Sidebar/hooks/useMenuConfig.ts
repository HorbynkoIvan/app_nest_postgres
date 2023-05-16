import { MdManageAccounts, MdSupervisedUserCircle, MdFeed } from "react-icons/md";
import { CgOrganisation } from "react-icons/cg";
import { MenuItem } from "../interfaces";

const menuConfig: MenuItem[] = [
  {
    id: "super_admin",
    title: "Super Admin Managers",
    icon: MdManageAccounts,
    subMenu: [
      {
        id: "public_entities",
        title: "Public entities",
        url: "/entities",
      },
      {
        id: "accounts",
        title: "Admin Accounts Manager",
        url: "/accounts",
      },
      {
        id: "admin_roles",
        title: "Admin Roles Manager",
        url: "/admin-roles",
      },
      {
        id: "user_roles",
        title: "User Roles Manager",
        url: "/user-roles",
      },
      {
        id: "organization",
        title: "Organization Manager",
        url: "/organizations",
      },
      {
        id: "single_signon",
        title: "Single SignOn Manager",
        url: "/single-signon",
      },
      {
        id: "report",
        title: "Report types manager",
        url: "/report",
      },
    ],
  },
  {
    id: "org_selector_1",
    title: "Organization Selector",
    icon: CgOrganisation,
    subMenu: [
      {
        id: "orgX",
        title: "Organization X",
        url: "/test",
      },
      {
        id: "orgY",
        title: "Organization Y",
        url: "/test",
      },
      {
        id: "orgZ",
        title: "Organization Z",
        url: "/test",
      },
    ],
  },
  {
    id: "org_selector_2",
    title: "Organization Selector",
    icon: MdSupervisedUserCircle,
    subMenu: [
      {
        id: "accounts",
        title: "User Accounts Manager",
        url: "/users",
      },
      {
        id: "accounts",
        title: "Courses Manager",
        url: "/test",
      },
      {
        id: "accounts",
        title: "Certificates Manager",
        url: "/test",
      },
      {
        id: "accounts",
        title: "Licensing Tracks Manager",
        url: "/test",
      },
      {
        id: "accounts",
        title: "Report Creator",
        url: "/test",
      },
      {
        id: "accounts",
        title: "Calendar Manager",
        url: "/test",
      },
      {
        id: "accounts",
        title: "Organization Customization",
        url: "/test",
      },
      {
        id: "accounts",
        title: "Notifications Manager",
        url: "/test",
      },
    ],
  },
  {
    id: "simple_id",
    title: "Simple Item",
    url: "/test",
    icon: MdFeed,
  },
];

export const useMenuConfig = (): MenuItem[] => menuConfig;
