import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { palette } from "theme";
import { FormikProvider } from "formik";
import { EntDetails, DependentEntities } from "./index";
import { useDetailsForm } from "../hooks";
import { BoxScrolled } from "common/ui";

export const Form = (): JSX.Element => {
  const formik = useDetailsForm();

  return (
    <BoxScrolled height="calc(100% - 70px)" withScrollBar>
      <FormikProvider value={formik}>
        <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          <Stack direction="row" mt={6}>
            <EntDetails />
            <Divider
              sx={{ borderColor: palette.grey[200], mx: 10 }}
              orientation="vertical"
              flexItem
            />
            <DependentEntities />
          </Stack>

          <Stack direction="row" justifyContent="center" mt={10}>
            <Button variant="contained" type="submit" sx={{ height: 44 }} color="success">
              <Typography variant="button" textTransform="initial" fontWeight={700}>
                Save changes
              </Typography>
            </Button>
          </Stack>
        </Box>
      </FormikProvider>
    </BoxScrolled>
  );
};
