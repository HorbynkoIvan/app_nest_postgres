import { createTheme } from "@mui/material/styles";

import { general } from "./general";
import { typography } from "./typography";
import { components } from "./components";

const initTheme = {
  ...general,
  components,
  typography,
};

export const theme = createTheme(initTheme);
