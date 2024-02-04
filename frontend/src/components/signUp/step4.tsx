import React from 'react'
import TextInput from "../textInput"
import { FormikProps } from "formik"
import { SignUpForm } from "../../pages/Signup"

type Props = {
  formik: FormikProps<SignUpForm>
}

const Step4 = ({ formik }: Props) => {
  console.log(formik.errors)
  return (
    <div className="space-y-5">
      <TextInput error={formik.errors.password} type="password" placeholder="********" name="password" value={formik.values.password} label="Choose a password" onChange={formik.handleChange} />
      <TextInput error={formik.errors.confirm_password} type="password" placeholder="********" name="confirm_password" value={formik.values.confirm_password} label="Confirm password" onChange={formik.handleChange} />
    </div>
  )
}

export default Step4