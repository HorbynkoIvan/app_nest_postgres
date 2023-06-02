import { styled, IconButton as IconButtonMui, IconButtonProps } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";
import { forwardRef } from "react";

type Props = IconButtonProps & LinkProps;

// eslint-disable-next-line react/display-name
const LinkBehavior = forwardRef<any, Omit<LinkProps, "to">>((props, ref) => (
  <Link ref={ref} to="/" {...props} role={undefined} />
));

export const IconButtonRouter = styled((props: Props) => (
  <IconButtonMui disableTouchRipple component={LinkBehavior} {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: "4px",
}));

export const IconButton = styled((props: IconButtonProps) => (
  <IconButtonMui disableTouchRipple {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: "4px",
}));
