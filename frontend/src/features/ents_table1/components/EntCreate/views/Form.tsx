import { Box, Button, FormHelperText, Stack, Typography } from "@mui/material";
import { useEntCreateForm } from "../hooks";
import { useNavigate } from "react-router-dom";

import { FormikProvider } from "formik";
import { CreateEnt } from "./CreateEnt";
import { palette } from "theme";

export const Form = () => {
  const navigate = useNavigate();
  const formik = useEntCreateForm();

  return (
    <>
      <FormikProvider value={formik}>
        <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          <Stack direction="row" mt={6}>
            <CreateEnt />
          </Stack>
          <Box height={30} mt={5}>
            {!formik.isValid && (
              <FormHelperText
                error
                sx={{ m: 0, textAlign: "center", fontWeight: 700, fontSize: 16 }}>
                Please choose an Entity type and title to create a new Entity
              </FormHelperText>
            )}
          </Box>
          <Stack direction="row" justifyContent="center" mt={5} spacing={5}>
            <Button
              variant="contained"
              type="submit"
              sx={{ height: 44 }}
              color="success"
              disabled={formik.isSubmitting}>
              <Typography variant="button" textTransform="initial" fontWeight={700}>
                Create New Entity
              </Typography>
            </Button>
            <Button
              sx={{
                background: palette.grey[100],
                height: 44,
                border: "1px solid black",
                color: "black",
              }}
              type="button"
              onClick={() => navigate(-1)}>
              <Typography variant="button" textTransform="initial" fontWeight={700}>
                Cancel
              </Typography>
            </Button>
          </Stack>
        </Box>
      </FormikProvider>
    </>
  );
};
