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
    id: "agencies",
    title: "Agencies",
    url: "/agencies",
    icon: MdOutlineLeaderboard,
  },
];

export const useMenuConfig = (): MenuItem[] => menuConfig;
