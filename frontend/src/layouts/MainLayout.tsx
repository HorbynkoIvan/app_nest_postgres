import { Box } from "@mui/material";
import { AppBar } from "common/components";
import { Outlet } from "react-router-dom";

export const MainLayout = (): JSX.Element => (
  <>
    <AppBar />
    <Box component="main" width="100%" maxWidth="1600px" margin="0 auto" height="75vh">
      <Outlet />
    </Box>
  </>
);
