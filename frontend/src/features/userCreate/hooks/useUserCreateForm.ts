import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION, GET_USERS_QUERY } from "common/graphql";

const defaultValues = {
  username: "",
  email: "",
  role: "",
  firstName: "",
  lastName: "",
  age: "",
  city: "",
};

export const useUserCreateForm = () => {
  const [createUserMutation, { loading }] = useMutation(CREATE_USER_MUTATION);

  return useFormik({
    initialValues: { ...defaultValues },
    validationSchema: yup.object({
      username: yup.string().required("required"),
      email: yup.string().email("Invalid email format").required("required"),
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      age: yup.number().required("required"),
      city: yup.string().required("required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (loading) return;

      await createUserMutation({
        variables: {
          user: {
            username: values.username,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            age: Number(values.age),
            city: values.city,
          },
        },
        refetchQueries: [{ query: GET_USERS_QUERY }],
      });
      resetForm();
    },
  });
};
