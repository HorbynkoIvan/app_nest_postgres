import { Box, Button, Divider, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { FormikProvider } from "formik";
import { MdMode } from "react-icons/md";
import { useUserCreateForm } from "../../hooks";

export const UserForm = (): JSX.Element => {
  const formik = useUserCreateForm();
  const { values, handleChange, handleBlur, errors, touched } = formik;

  return (
    <FormikProvider value={formik}>
      <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <Typography variant="h4" textTransform="initial" fontWeight={700}>
            Personal details
          </Typography>

          <TextField
            label="UserName:"
            placeholder="UserName"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MdMode />
                </InputAdornment>
              ),
            }}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.userName}
            name="userName"
            error={!!touched.userName && !!errors.userName}
            helperText={touched.userName && errors.userName && String(errors.userName)}
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

          <Box component={Divider} mx={2} />
          <Stack direction="row" spacing={4}>
            <TextField
              label="FirstName:"
              placeholder="FirstName"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MdMode />
                  </InputAdornment>
                ),
              }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              name="firstName"
              error={!!touched.firstName && !!errors.firstName}
              helperText={touched.firstName && errors.firstName && String(errors.firstName)}
            />
            <TextField
              label="LastName:"
              placeholder="LastName"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MdMode />
                  </InputAdornment>
                ),
              }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
              error={!!touched.lastName && !!errors.lastName}
              helperText={touched.lastName && errors.lastName && String(errors.lastName)}
            />
          </Stack>

          <Stack direction="row" spacing={4}>
            <TextField
              label="City:"
              placeholder="City"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MdMode />
                  </InputAdornment>
                ),
              }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.city}
              name="city"
              error={!!touched.city && !!errors.city}
              helperText={touched.city && errors.city && String(errors.city)}
            />

            <TextField
              label="Age:"
              placeholder="Age"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MdMode />
                  </InputAdornment>
                ),
              }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.age}
              name="age"
              error={!!touched.age && !!errors.age}
              helperText={touched.age && errors.age && String(errors.age)}
            />
          </Stack>

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
