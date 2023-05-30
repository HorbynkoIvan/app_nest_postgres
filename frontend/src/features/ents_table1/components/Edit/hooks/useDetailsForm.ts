import { useFormik } from "formik";
import * as yup from "yup";

const defaultValues: any = {
  id: null,
  type: "",
  title: "",
  description: "",
  parentEntity: "",
};

export const useDetailsForm = (dataAPI?: any) => {
  return useFormik({
    initialValues: { ...defaultValues, ...dataAPI },

    validationSchema: yup.object({
      title: yup.string().required("required"),
    }),
    onSubmit: (values) => {
      console.log("onSubmit", JSON.stringify(values, null, 2));
    },
  });
};
