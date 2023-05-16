import { MouseEvent } from "react";
import { ListItemButton, ListItemIcon, ListItemText, SvgIcon, Typography } from "@mui/material";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { MenuCollapseItem } from "../interfaces";

type Props = MenuCollapseItem & {
  collapseId: string;
  handleClick: (event: MouseEvent<HTMLElement>) => void;
};

export const SidebarCollapseItem = ({ id, title, collapseId, icon, handleClick }: Props) => (
  <ListItemButton id={id} sx={{ py: 1.5, px: 3 }} onClick={handleClick} disableRipple>
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
    {collapseId === id ? <MdExpandLess size={16} /> : <MdExpandMore size={16} />}
  </ListItemButton>
);
