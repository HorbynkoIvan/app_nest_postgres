import { Box, ListItemButtonProps, ListItemText, Typography } from "@mui/material";
import { palette } from "theme/palette";
import { Link } from "react-router-dom";
import { ListItemButtonSC } from "./ListItemButtonSC";
import { MenuSubItem } from "../interfaces";

type Props = ListItemButtonProps & MenuSubItem;

export const SidebarSubItem = ({ title, url, selected }: Props) => (
  <Box component={Link} to={url} sx={{ textDecoration: "none" }}>
    <ListItemButtonSC selected={selected} disableRipple>
      <ListItemText>
        <Typography
          variant="subtitle2"
          color={palette.grey[700]}
          fontWeight={400}
          textTransform="initial">
          {title}
        </Typography>
      </ListItemText>
    </ListItemButtonSC>
  </Box>
);
