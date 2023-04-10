import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PaperWrapper } from "../../common/components";
import { ProfileForm } from "./components/ProfileForm";

export const ProfileFeature = () => {
  return (
    <PaperWrapper sx={{ maxWidth: 400, margin: "30px auto 0" }}>
      <Stack sx={{ height: "100%" }}>
        <Typography variant="h3" component="h3" textAlign="center">
          Profile form
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: "48px" }} textAlign="center">
          here you can create new user
        </Typography>

        <ProfileForm />

        <Typography align="center" variant="subtitle2" sx={{ mt: "auto", mb: "40px" }}>
          Changed your mind?{" "}
          <Typography variant="subtitle2" component={Link} to="/team">
            Return to list of users
          </Typography>
        </Typography>
      </Stack>{" "}
    </PaperWrapper>
  );
};
