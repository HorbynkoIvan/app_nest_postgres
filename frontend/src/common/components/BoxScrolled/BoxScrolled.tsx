import { ReactNode } from "react";
import { Box, BoxProps } from "@mui/material";
import { grey } from "@mui/material/colors";

type Props = BoxProps & {
  children: ReactNode;
  height?: string;
  withScrollBar?: boolean;
};

export const BoxScrolled = ({ children, height, withScrollBar }: Props): JSX.Element => (
  <Box
    sx={{
      position: "relative",
      height: height || "100%",
    }}>
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        overflow: "auto",

        "::-webkit-scrollbar": {
          display: "none",
        },

        ...(withScrollBar && {
          "::-webkit-scrollbar": {
            width: "5px",
            border: `1px solid ${grey[600]}`,
          },
          "::-webkit-scrollbar-thumb": {
            background: `${grey[400]}`,
            borderRadius: "20px",
          },
        }),
      }}>
      {children}
    </Box>
  </Box>
);
