import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PaperWrapper } from "../../common/components";
import { UserForm } from "./components";
import { useUserAPI } from "./hooks/useUserAPI";

export const UserEditFeature = () => {
  const { user, loading } = useUserAPI();

  if (loading)
    return (
      <Stack justifyContent="center" alignItems="center" height="100%">
        <Typography variant="h1">Loading...</Typography>
      </Stack>
    );

  return (
    <PaperWrapper sx={{ maxWidth: 400, margin: "30px auto 0" }}>
      <Stack sx={{ height: "100%" }}>
        <Typography variant="h3" component="h3" textAlign="center">
          User Edit Form
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: "48px" }} textAlign="center">
          here you can edit user
        </Typography>

        <UserForm user={user} />

        <Typography align="center" variant="subtitle2" sx={{ mt: "auto", mb: "40px" }}>
          Changed your mind?{" "}
          <Typography variant="subtitle2" component={Link} to="/users">
            Return to list of users
          </Typography>
        </Typography>
      </Stack>
    </PaperWrapper>
  );
};
