import { Box } from "@mui/material";
import { AppBar } from "common/componets";
import { Outlet } from "react-router-dom";

export const MainLayout = (): JSX.Element => (
  <Box
    sx={{
      width: "100%",
      height: "100%",
    }}>
    <AppBar />
    <Box component="main">
      <Outlet />
    </Box>
  </Box>
);
