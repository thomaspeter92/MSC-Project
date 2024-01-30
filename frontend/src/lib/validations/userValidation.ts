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
