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
  title: yup.string().required(),
  description: yup.string(),
  image: yup.string().required().default("https://source.unsplash.com/random"),
  price: yup.number().min(0).default(0),
});

export const auctionPostSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  image: yup.string().required().default("https://source.unsplash.com/random"),
  basePrice: yup.number().min(0).required("A product should have a base price"),
  venue: yup.string().required("Venue is required"),
  date: yup.date(),
});
export const tenderPostSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  maxbid: yup.number().required(),
  expiryDate: yup.date().required(),
});
