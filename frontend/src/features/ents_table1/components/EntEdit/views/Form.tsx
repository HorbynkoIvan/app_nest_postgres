import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { palette } from "theme";
import { FormikProvider } from "formik";
import { EntityDetails, DependentEntities } from "./index";
import { useDetailsForm } from "../hooks";
import { EntType } from "../../../interfaces";

type Props = {
  ent: EntType;
};

export const Form = ({ ent }: Props) => {
  const formik = useDetailsForm(ent);

  return (
    <FormikProvider value={formik}>
      <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <Stack direction="row" mt={6}>
          <EntityDetails />
          <Divider
            sx={{ borderColor: palette.grey[200], mx: 10 }}
            orientation="vertical"
            flexItem
          />
          <DependentEntities dependents={ent.dependents} />
        </Stack>

        <Stack direction="row" justifyContent="center" mt={10}>
          <Button
            variant="contained"
            type="submit"
            sx={{ height: 44 }}
            color="success"
            disabled={formik.isSubmitting}>
            <Typography variant="button" textTransform="initial" fontWeight={700}>
              Save changes
            </Typography>
          </Button>
        </Stack>
      </Box>
    </FormikProvider>
  );
};
