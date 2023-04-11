import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_MUTATION, GET_ALL_USERS_QUERY } from "common/graphql";

const defaultValues = {
  name: "",
  email: "",
};

export const useUserEditForm = (user: any) => {
  const [updateUserMutation, { loading }] = useMutation(UPDATE_USER_MUTATION);

  return useFormik({
    initialValues: { ...defaultValues, ...user },
    validationSchema: yup.object({
      name: yup.string().required("required"),
      email: yup.string().email("Invalid email format").required("required"),
    }),
    onSubmit: async (values) => {
      if (loading) return;

      await updateUserMutation({
        variables: {
          user: {
            id: values.id,
            name: values.name,
            email: values.email,
          },
        },
        refetchQueries: [{ query: GET_ALL_USERS_QUERY }],
      });
    },
  });
};
