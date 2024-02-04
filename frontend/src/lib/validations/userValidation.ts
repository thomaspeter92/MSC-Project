import * as yup from 'yup';

export const usernameValidation = yup
  .string()
  .required('usernameRequired') /* '사용자 아이디는 필수항목입니다.' */
  .min(4, 'usernameLength') /* 사용자 아이디는 5-20 글자가 필요합니다. */
  .max(20, 'usernameLength') /* 사용자 아이디는 5-20 글자가 필요합니다. */
  .matches(
    /^[a-z0-9]+$/,
    'usernameFormat'
  ); /* 사용자명에는 글자와 숫자만 사용가능합니다. */

export const emailValidation = yup
  .string()
  .email()
  .matches(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'Email invalid'
  )
  .required('Email is required.');

const passwordValidation = yup
  .string()
  .min(5, 'Password must be 5-15 characters.')
  .max(15, 'Password must be 5-15 characters.')
  .required('Password is required');

export const signInValidator = yup.object({
  email: emailValidation,
  password: passwordValidation,
});

// SIGN UP VALIDATORS
export const step1Validator = yup.object({
  first_name: yup.string().min(2, "Must be 2-20 characters").max(20, "Must be 2-20 characters").required("Name is required"),
  last_name: yup.string().min(2, "Must be 2-20 characters").max(20, "Must be 2-20 characters").required("Name is required"),
  age: yup.string().required("Age is required"),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  sex: yup.string().required("Gender is required"),
  orientation: yup.string().required("Orientation is required")
})
export const step2Validator = yup.object({
  likes: yup.array().min(1, "Please select 1-5 categories").max(5).of(yup.string()).required('Please select up 1-5 likes.')
})
export const step3Validator = yup.object({
  picture: yup.mixed().required('Please upload a profile picture')
})
export const step4Validator = yup.object({
  password: yup.string().min(8, "must be 8-20 characters").max(20, "must be 8-20 characters").required("Password is required"),
  confirm_password: yup.string().oneOf([yup.ref('password')], "Password must match").required('Please confirm your password')
})


