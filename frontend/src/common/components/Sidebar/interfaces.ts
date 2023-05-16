import { IconType } from "react-icons";

export type MenuSimpleItem = {
  id: string;
  title: string;
  url: string;
  icon: IconType;
};

export type MenuCollapseItem = {
  id: string;
  title: string;
  icon: IconType;
  subMenu: Array<MenuSubItem>;
};

export type MenuSubItem = {
  id: string;
  title: string;
  url: string;
};

export type MenuItem = MenuSimpleItem | MenuCollapseItem | MenuSubItem;

export function MenuSimpleItemGuard(menuItem: MenuItem): menuItem is MenuSimpleItem {
  return "icon" in menuItem && !("subMenu" in menuItem);
}

export function MenuCollapseItemGuard(menuItem: MenuItem): menuItem is MenuCollapseItem {
  return "subMenu" in menuItem;
}
