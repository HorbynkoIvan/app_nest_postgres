import {
  AppBar as AppBarMui,
  Box,
  FormControlLabel,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Typography,
  Toolbar,
  Button,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const navLinks = [
  { name: "Team", route: "team" },
  { name: "Profile form", route: "profile" },
];

export const AppBar = () => {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    /* ToDo remove below*/
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup>
      {/* ToDo remove above*/}

      <AppBarMui position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Logo
          </Typography>

          {navLinks.map(({ name, route }) => (
            <Box component={NavLink} key={name} to={route} sx={{ textDecoration: "none" }}>
              <Button sx={{ color: "#fff" }}>{name}</Button>
            </Box>
          ))}

          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBarMui>
    </Box>
  );
};
