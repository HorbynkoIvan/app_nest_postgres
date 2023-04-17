import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { GET_USERS_QUERY, UPDATE_USER_MUTATION } from "common/graphql";

const defaultValues = {
  userName: "",
  email: "",
  role: "staff",
  firstName: "",
  lastName: "",
  age: "",
  city: "",
};

export const useUserEditForm = (user: any) => {
  const [updateUserMutation, { loading }] = useMutation(UPDATE_USER_MUTATION);

  const userApi = {
    id: user.id,
    userName: user.userName,
    email: user.email,
    firstName: user.profile.firstName,
    lastName: user.profile.lastName,
    age: Number(user.profile.age),
    city: user.profile.city,
    role: user.profile.role,
  };

  return useFormik({
    initialValues: { ...defaultValues, ...userApi },
    validationSchema: yup.object({
      userName: yup.string().required("required"),
      email: yup.string().email("Invalid email format").required("required"),
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      age: yup.number().required("required"),
      city: yup.string().required("required"),
    }),
    onSubmit: async (values) => {
      if (loading) return;

      await updateUserMutation({
        variables: {
          user: {
            id: Number(values.id),
            userName: values.userName,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            age: Number(values.age),
            city: values.city,
            role: values.role,
          },
        },
        refetchQueries: [{ query: GET_USERS_QUERY }],
      });
    },
  });
};
