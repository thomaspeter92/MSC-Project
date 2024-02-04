import { FormikProps } from "formik"
import SelectInput from "../selectInput"
import TextInput from "../textInput"
import { SignUpForm } from "../../pages/Signup"

type Props = {
  formik: FormikProps<SignUpForm>
}

const Step1 = ({ formik }: Props) => {
  console.log(formik.errors)
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-10">
        <TextInput value={formik.values.first_name} name="first_name" onChange={formik.handleChange} error={formik.errors.first_name} type="text" placeholder="First name" label="What is your first name?" />
        <TextInput value={formik.values.last_name} name="last_name" onChange={formik.handleChange} error={formik.errors.last_name} type="text" placeholder="Last name" label="Enter your first name?" />
      </div>
      <div className="flex items-center gap-10">
        <TextInput type="number" min="18" max="110" placeholder="" value={formik.values.age} name="age" onChange={formik.handleChange} error={formik.errors.age} label="What's your age?" />
        <TextInput type="text" placeholder="email" value={formik.values.email} name="email" onChange={formik.handleChange} error={formik.errors.email} label="What is your email?" />
      </div>
      <div className="flex items-center gap-10">
        <SelectInput name="sex" defaultValue={formik.values.sex} error={formik.errors.sex} onChange={(val: any) => formik.setFieldValue('sex', val.value)} label="What is your gender identity?" options={[{ name: 'Male', value: 'm' }, { name: 'Female', value: 'f' }]} />
        <SelectInput name="orientation" error={formik.errors.orientation} onChange={(val: any) => formik.setFieldValue('orientation', val.value)} label="What is your sexual orientation?" options={[{ name: 'Straight', value: 'straight' }, { name: 'Gay', value: 'gay' }]} />
      </div>
    </div>
  )
}

export default Step1