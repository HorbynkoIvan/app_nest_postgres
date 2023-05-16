import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Loader, PaperWrapper } from "common/components";
import { useUserAPI } from "../../hooks";
import { EditFormWrapper } from "./EditFormWrapper";

export const UserEdit = () => {
  const { user, loading } = useUserAPI();

  if (loading) return <Loader />;

  return (
    <PaperWrapper sx={{ maxWidth: 400, margin: "30px auto 0" }}>
      <Stack sx={{ height: "100%" }}>
        <Typography variant="h3" component="h3" textAlign="center">
          User Edit Form
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: "48px" }} textAlign="center">
          here you can edit user
        </Typography>

        <EditFormWrapper user={user} />

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
