import { Box, InputAdornment, Stack, Typography } from "@mui/material";
import { TextFieldPrimary, TextAreaPrimary, Select } from "common/ui";
import { MdMode } from "react-icons/md";
import { ENT_TYPES_OPTIONS } from "common/constants";
import { useFormikContext } from "formik";

export const CreateEnt = (): JSX.Element => {
  const { values, handleChange, handleBlur, errors, touched } = useFormikContext<any>();

  const renderTextField = (label: string, name: string, value: string): JSX.Element => (
    <TextFieldPrimary
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
    />
  );

  return (
    <Box flex={1}>
      <Stack spacing={4} maxWidth={405}>
        <Typography variant="h4" textTransform="initial" fontWeight={700}>
          Create Entity
        </Typography>

        <Select
          sx={{ width: "100%", height: 53, mt: 2 }}
          label="Entity Type"
          value={values.type}
          options={ENT_TYPES_OPTIONS}
          onChange={handleChange}
          name="type"
          onBlur={handleBlur}
          error={!!touched.type && !!errors.type}
        />

        {renderTextField("Title:", "title", values.title)}

        <TextAreaPrimary
          label="Description"
          placeholder="Description"
          name="description"
          value={values.description}
          multiline
          rows={5}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        {renderTextField("Add ID of New Parent Entity", "parentId", values.parentId)}
      </Stack>
    </Box>
  );
};
