import { Box, Button, InputAdornment, Stack, Typography } from "@mui/material";
import { TextFieldPrimary, TextAreaPrimary } from "common/ui";
import { DetailsItem } from "./DetailsItem";
import { useFormikContext } from "formik";
import { MdMode } from "react-icons/md";
// import { TYPE_OPTIONS } from "common/constants";
import { useShowParentIdField } from "../hooks";

export const EntityDetails = () => {
  const { values, handleChange, handleBlur, errors, touched } = useFormikContext<any>();
  const { isShowedParentIdField, showParentIdField } = useShowParentIdField();

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
      helperText={touched[name] && errors[name] && String(errors[name])}
    />
  );

  return (
    <Box flex={1}>
      <Stack spacing={4} maxWidth={405}>
        <Typography variant="h4" textTransform="initial" fontWeight={700}>
          Entity Details
        </Typography>

        {/* <SelectPrimary*/}
        {/*  label="Entity Type"*/}
        {/*  defaultValue={"school"}*/}
        {/*  options={TYPE_OPTIONS}*/}
        {/*  onChange={handleChange}*/}
        {/*  name="type"*/}
        {/* />*/}

        {renderTextField("Title:", "title", values.title)}

        <TextAreaPrimary
          label="Description"
          placeholder="Position"
          name="description"
          value={values.description}
          multiline
          rows={5}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <DetailsItem title="Creator" details="Entity Details" />
        <DetailsItem title="Date" details="1.15.23" />
        <DetailsItem title="Last Editor" details="Bob Jones" />
        <DetailsItem title="Date" details="3.15.23" />
        <DetailsItem title="Parent Entity" details="New York" />

        {!isShowedParentIdField ? (
          <Button
            variant="contained"
            type="submit"
            sx={{ height: 40 }}
            color="primary"
            onClick={showParentIdField}>
            <Typography variant="button" textTransform="initial" fontWeight={700}>
              Change Parent Entity
            </Typography>
          </Button>
        ) : (
          renderTextField("Add ID of New Parent Entity", "parentEntity", values.parentEntity)
        )}
      </Stack>
    </Box>
  );
};
