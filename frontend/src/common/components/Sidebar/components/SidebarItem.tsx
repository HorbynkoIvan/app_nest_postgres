import {
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Typography,
  ListItemButtonProps,
  ListItemButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { MenuSimpleItem } from "../interfaces";

type Props = ListItemButtonProps & MenuSimpleItem;

export const SidebarItem = ({ title, url, icon, selected }: Props) => (
  <ListItemButton
    component={Link}
    to={url}
    selected={selected}
    sx={{ py: 1.5, px: 3 }}
    disableRipple>
    <ListItemIcon sx={{ minWidth: 25 }}>
      <SvgIcon component={icon} sx={{ width: 20, height: 20 }} />
    </ListItemIcon>
    <ListItemText>
      <Typography
        variant="subtitle1"
        color="#161619"
        fontWeight={600}
        textTransform="initial"
        whiteSpace="nowrap">
        {title}
      </Typography>
    </ListItemText>
  </ListItemButton>
);
