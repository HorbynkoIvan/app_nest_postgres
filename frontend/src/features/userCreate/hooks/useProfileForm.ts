import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION, GET_USERS_QUERY } from "common/graphql";

const defaultValues = {
  name: "",
  email: "",
};

export const useProfileForm = () => {
  const [createUserMutation, { loading }] = useMutation(CREATE_USER_MUTATION);

  return useFormik({
    initialValues: { ...defaultValues },
    validationSchema: yup.object({
      name: yup.string().required("required"),
      email: yup.string().email("Invalid email format").required("required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (loading) return;

      await createUserMutation({
        variables: {
          user: {
            name: values.name,
            email: values.email,
          },
        },
        refetchQueries: [{ query: GET_USERS_QUERY }],
      });
      resetForm();
    },
  });
};
