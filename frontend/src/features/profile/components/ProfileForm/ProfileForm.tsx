import { Box, Typography, Stack, TextField, InputAdornment, Button } from "@mui/material";
import { FormikProvider } from "formik";
import { MdMode } from "react-icons/md";
import { useProfileForm } from "../../hooks";

export const ProfileForm = (): JSX.Element => {
  const formik = useProfileForm();
  const { values, handleChange, handleBlur, errors, touched } = formik;

  return (
    <FormikProvider value={formik}>
      <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <Typography variant="h4" textTransform="initial" fontWeight={700}>
            Personal details
          </Typography>

          <TextField
            label="Name:"
            placeholder="Name"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MdMode />
                </InputAdornment>
              ),
            }}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            name="name"
            error={!!touched.name && !!errors.name}
            helperText={touched.name && errors.name && String(errors.name)}
          />

          <TextField
            label="E-mail:"
            placeholder="E-mail"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MdMode />
                </InputAdornment>
              ),
            }}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name="email"
            error={!!touched.email && !!errors.email}
            helperText={touched.email && errors.email && String(errors.email)}
          />

          {/* <Select*/}
          {/*    label="Default Admin Role"*/}
          {/*    options={[*/}
          {/*      { id: 1, name: "admin" },*/}
          {/*      { id: 2, name: "superAdmin" },*/}
          {/*    ]}*/}
          {/*    onChange={handleChange}*/}
          {/*    value={values.role}*/}
          {/*    name="role"*/}
          {/* />*/}
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
  );
};
