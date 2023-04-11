import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PaperWrapper } from "../../common/components";
import { UserForm } from "./components/UserForm";
import { useOneUserAPI } from "./hooks/useOneUserAPI";

export const UserEditFeature = () => {
  const { user, loading } = useOneUserAPI();

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
          User edit form
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: "48px" }} textAlign="center">
          here you can edit user
        </Typography>

        <UserForm user={user} />

        <Typography align="center" variant="subtitle2" sx={{ mt: "auto", mb: "40px" }}>
          Changed your mind?{" "}
          <Typography variant="subtitle2" component={Link} to="/team">
            Return to list of users
          </Typography>
        </Typography>
      </Stack>
    </PaperWrapper>
  );
};
