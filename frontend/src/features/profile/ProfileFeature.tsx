import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const ProfileFeature = () => {
  return (
    <Stack sx={{ height: "100%" }}>
      <Typography variant="h3" component="h3">
        Profile form
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: "48px" }}>
        here you can create new user
      </Typography>

      {/* <LoginForm />*/}

      <Typography align="center" variant="subtitle2" sx={{ mt: "auto", mb: "40px" }}>
        Changed your mind?
        <Typography variant="subtitle2" component={Link} to="/team">
          Return to list of users
        </Typography>
      </Typography>
    </Stack>
  );
};
