import { CircularProgress, Stack } from "@mui/material";

export const Loader = () => (
  <Stack justifyContent="center" alignItems="center" height="100%">
    <CircularProgress size={60} thickness={5} />
  </Stack>
);
