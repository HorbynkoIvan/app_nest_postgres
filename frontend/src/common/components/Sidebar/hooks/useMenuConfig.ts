import { MdOutlineLeaderboard, MdSupervisedUserCircle } from "react-icons/md";
import { MenuItem } from "../interfaces";

const menuConfig: MenuItem[] = [
  {
    id: "users",
    title: "Users",
    url: "/users",
    icon: MdSupervisedUserCircle,
  },
  {
    id: "ents",
    title: "Entities",
    url: "/ents",
    icon: MdOutlineLeaderboard,
  },
  {
    id: "organizations",
    title: "Organizations",
    url: "/organizations",
    icon: MdOutlineLeaderboard,
  },
];

export const useMenuConfig = (): MenuItem[] => menuConfig;
