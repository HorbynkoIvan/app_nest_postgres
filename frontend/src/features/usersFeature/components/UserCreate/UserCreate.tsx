import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { UserForm, PaperWrapper } from "common/components";
import { useUserCreateForm } from "../../hooks";

export const UserCreate = () => {
  const formik = useUserCreateForm();

  return (
    <PaperWrapper sx={{ maxWidth: 400, margin: "30px auto 0" }}>
      <Box height="100%">
        <Typography variant="h3" component="h3" textAlign="center">
          New User Form
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: "48px" }} textAlign="center">
          here you can create new user
        </Typography>

        <UserForm formik={formik} />

        <Typography align="center" variant="subtitle2" sx={{ mt: "auto", mb: "40px" }}>
          Changed your mind?{" "}
          <Typography variant="subtitle2" component={Link} to="/users">
            Return to list of users
          </Typography>
        </Typography>
      </Box>{" "}
    </PaperWrapper>
  );
};
