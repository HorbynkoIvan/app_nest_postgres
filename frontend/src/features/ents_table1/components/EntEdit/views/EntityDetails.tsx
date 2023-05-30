import moment from "moment/moment";
import { Box, Button, InputAdornment, Stack, Typography } from "@mui/material";
import { TextFieldPrimary, TextAreaPrimary, Select } from "common/ui";
import { DetailsItem } from "./DetailsItem";
import { FormikErrors, useFormikContext } from "formik";
import { MdMode } from "react-icons/md";
import { ENT_TYPES_OPTIONS } from "common/constants";
import { useShowParentIdField } from "../hooks";
import { EntType } from "../../../interfaces";

type Context = EntType & FormikErrors<any>;

export const EntityDetails = () => {
  const { values, handleChange, handleBlur, errors, touched } = useFormikContext<Context>();
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

        <TextFieldPrimary label="ID:" value={values.id} disabled />

        <Select
          sx={{ width: "100%", height: 53, mt: 2 }}
          label="Entity Type"
          defaultValue={values.type}
          value={values.type}
          options={ENT_TYPES_OPTIONS}
          onChange={handleChange}
          name="type"
        />

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

        <DetailsItem title="Creator" details={values.creator.username} />
        <DetailsItem
          title="Date"
          details={moment(Number(values.creator.dateCreate)).format("DD.MM.YYYY")}
        />
        {values.editor?.username && (
          <DetailsItem title="Last Editor" details={values.editor?.username} />
        )}
        {values.editor?.dateCreate && (
          <DetailsItem
            title="Date"
            details={moment(Number(values.editor?.dateCreate)).format("DD.MM.YYYY")}
          />
        )}
        {values.parent?.title && (
          <DetailsItem title="Parent Entity" details={values.parent?.title} />
        )}

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
          renderTextField(
            "Add ID of New Parent Entity",
            "parent.id",
            values.parent ? values.parent.id.toString() : ""
          )
        )}
      </Stack>
    </Box>
  );
};
