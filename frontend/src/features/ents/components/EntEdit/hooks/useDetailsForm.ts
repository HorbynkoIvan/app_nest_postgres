import { useFormik } from "formik";
import * as yup from "yup";
import { EntType } from "../../../interfaces";
import { useMutation } from "@apollo/client";
import { GET_ENTS_QUERY, UPDATE_ENT_MUTATION } from "../../../graphql";

type DefaultValues = {
  type: string;
  title: string;
  description: string;
  parentId: number | null;
};

const defaultValues: DefaultValues = {
  type: "",
  title: "",
  description: "",
  parentId: null,
};

export const useDetailsForm = (dataAPI?: EntType) => {
  const [updateEnt] = useMutation(UPDATE_ENT_MUTATION);

  return useFormik({
    initialValues: { ...defaultValues, ...dataAPI },

    validationSchema: yup.object({
      title: yup.string().required("required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await updateEnt({
          variables: {
            updateEntInput: {
              id: values.id,
              type: values.type,
              title: values.title,
              description: values.description,
              parentId: Number(values.parent?.id),
            },
            refetchQueries: [GET_ENTS_QUERY],
          },
        });
      } catch (error) {
        throw new Error(String(error));
      } finally {
        setSubmitting(false);
      }
    },
  });
};
