import * as yup from "yup";

export const signupSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email().required(),
  phone: yup
    .number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required("A phone number is required"),
  username: yup.string().min(4).required("Username is required"),
  password: yup
    .string()
    .min(8)
    .max(15)
    .required("Password must be of min. 8 and max 15 letters"),
  address: yup.string(),
});

export const signinSchema = yup.object().shape({
  username: yup.string().min(4).required("Username is required"),
  password: yup
    .string()
    .min(8)
    .max(15)
    .required("Password must be of min. 8 and max 15 letters"),
});

export const postSchema = yup.object().shape({
<<<<<<< HEAD
  title: yup.string().required(),
  description: yup.string().required(),
  image: yup.string(),
  productAmount: yup.number().typeError("only numbars are allowed")
    .positive("Amount can't be a negative value"),
});
=======
  title: yup.string(),
  description: yup.string(),
  image: yup.string(),
  productAmount: yup.number().min(0).default(0),
});
>>>>>>> ce8308b4b8035c2fa0cec588a1657329aef67b14
