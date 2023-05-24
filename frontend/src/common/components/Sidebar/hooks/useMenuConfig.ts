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
];

export const useMenuConfig = (): MenuItem[] => menuConfig;
