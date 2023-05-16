import { Box, List, Collapse } from "@mui/material";
import { DRAWER_WIDTH } from "common/constants";
import { useLocation } from "react-router-dom";
import { SidebarCollapseItem, SidebarSubItem, SidebarItem } from "./components";
import { useMenuCollapse, useMenuConfig } from "./hooks";
import { MenuSimpleItemGuard, MenuCollapseItemGuard } from "./interfaces";

export const Sidebar = () => {
  const menuConfig = useMenuConfig();
  const { collapseId, handleCollapse } = useMenuCollapse();
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        boxShadow: "0px 6px 8px rgba(94, 129, 170, 0.08)",
        borderRadius: 3,
        mt: "73px",
        py: 3,
        backgroundColor: "#ffffff",
      }}>
      <List component="nav">
        {menuConfig.map((menuItem) => (
          <Box key={menuItem.id}>
            {MenuSimpleItemGuard(menuItem) && (
              <SidebarItem
                {...menuItem}
                selected={pathname.split("/")[1] === menuItem.url?.split("/")[1]}
              />
            )}
            {MenuCollapseItemGuard(menuItem) && (
              <>
                <SidebarCollapseItem
                  {...menuItem}
                  collapseId={collapseId}
                  handleClick={handleCollapse}
                />
                <Collapse in={collapseId === menuItem.id} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {menuItem.subMenu.map((subMenuItem: any) => (
                      <SidebarSubItem
                        key={subMenuItem.id}
                        {...subMenuItem}
                        selected={pathname.includes(subMenuItem.url)}
                      />
                    ))}
                  </List>
                </Collapse>
              </>
            )}
          </Box>
        ))}
      </List>
    </Box>
  );
};
