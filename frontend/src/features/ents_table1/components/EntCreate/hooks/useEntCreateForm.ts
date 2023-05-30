import { useMutation } from "@apollo/client";
import { CREATE_ENT_MUTATION, GET_ENTS_QUERY } from "features/ents_table1/graphql";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

type DefaultValues = {
  type: string;
  title: string;
  description: string;
  parentId: string;
};

const defaultValues: DefaultValues = {
  type: "",
  title: "",
  description: "",
  parentId: "",
};

export const useEntCreateForm = () => {
  const navigate = useNavigate();

  const [createEnt] = useMutation(CREATE_ENT_MUTATION, {
    onCompleted: (data) => {
      navigate(`/ents/${data.createEnt?.id}/edit`);
    },
  });

  return useFormik({
    initialValues: { ...defaultValues },

    validationSchema: yup.object({
      title: yup.string().required(),
      type: yup.string().required(),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        await createEnt({
          variables: {
            createEntInput: {
              type: values.type,
              title: values.title,
              description: values.description,
              parentId: Number(values.parentId),
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
