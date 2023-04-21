import { Box, Button, Divider, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { FormikProps, FormikProvider } from "formik";
import { MdMode } from "react-icons/md";
import { SelectPrimary } from "common/ui";

type UserFormType = {
  formik: FormikProps<any>;
};

export const UserForm = ({ formik }: UserFormType): JSX.Element => {
  const { values, handleChange, handleBlur, errors, touched } = formik;

  const renderTextField = (label: string, name: string, value: string) => (
    <TextField
      label={label}
      placeholder={label}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <MdMode />
          </InputAdornment>
        ),
      }}
      onBlur={handleBlur}
      onChange={handleChange}
      value={value}
      name={name}
      error={!!touched[name] && !!errors[name]}
      helperText={touched[name] && errors[name] && String(errors[name])}
    />
  );

  return (
    <FormikProvider value={formik}>
      <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <Typography variant="h4" textTransform="initial" fontWeight={700}>
            Personal details
          </Typography>

          {renderTextField("UserName:", "userName", values.userName)}
          {renderTextField("E-mail:", "email", values.email)}

          <Box component={Divider} mx={2} />

          <Stack direction="row" spacing={4}>
            {renderTextField("FirstName:", "firstName", values.firstName)}
            {renderTextField("LastName:", "lastName", values.lastName)}
          </Stack>

          <Stack direction="row" spacing={4}>
            {renderTextField("City:", "city", values.city)}
            {renderTextField("Age:", "age", values.age)}
          </Stack>

          <SelectPrimary
            label="User Role"
            options={["superAdmin", "admin", "staff"]}
            onChange={handleChange}
            value={values.role}
            name="role"
          />
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
