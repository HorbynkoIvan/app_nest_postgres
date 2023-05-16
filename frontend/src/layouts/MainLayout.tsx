import { Box } from "@mui/material";
import { AppBar, Sidebar } from "common/components";
import { Outlet } from "react-router-dom";

export const MainLayout = (): JSX.Element => (
  <Box sx={{ display: "flex", height: "100%", paddingBottom: "30px" }}>
    <AppBar />
    <Sidebar />
    <Box
      component="main"
      sx={{
        width: "100%",
        flexGrow: 1,
        mt: "73px",
      }}>
      <Outlet />
    </Box>
  </Box>
);
