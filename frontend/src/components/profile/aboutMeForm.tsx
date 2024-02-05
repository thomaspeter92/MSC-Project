import React from 'react'
import SelectInput from "../selectInput"
import Button from "../button"
import { useFormik } from "formik"
import { useMutation } from "@tanstack/react-query"
import { updateAboutInfo } from "../../services/userService"

type Props = {
  profile: any
}

const AboutMeForm = ({ profile }: Props) => {

  const updateAboutMeMutation = useMutation({
    mutationFn: updateAboutInfo
  })

  const formik = useFormik({
    initialValues: {
      smokes: profile?.smokes || '',
      diet: profile?.diet || '',
      drinks: profile?.drinks || '',
      education: profile?.education || '',
      pets: profile?.pets || '',
      job: profile?.job || '',
      offspring: profile?.offspring || '',
    },
    onSubmit: (values) => {
      updateAboutMeMutation.mutate(values, {
        onSuccess: (data) => {
          console.log(data)
        },
        onError: () => {

        }
      })
    }
  })

  console.log(formik.values)

  return (
    <form onSubmit={formik.handleSubmit} className="p-5 bg-white w-[50ch] space-y-5">
      <div className="flex gap-3">
        <SelectInput onChange={(val) => formik.setFieldValue('smokes', val.value)} name="smokes" label="Smokes" options={[{ name: 'Yes', value: 'yes' }, { name: 'No', value: 'no' }]} />
        <SelectInput onChange={(val) => formik.setFieldValue('diet', val.value)} name="diet" label="Diet" options={[{ name: 'Anything', value: 'anything' }, { name: 'Vegetarian', value: 'vegetarian' }, { name: 'Vegan', value: 'vegan' }]} />
      </div>
      <div className="flex gap-3">
        <SelectInput onChange={(val) => formik.setFieldValue('drinks', val.value)} name="drinks" label="Drinks" options={[{ name: 'Yes', value: 'yes' }, { name: 'No', value: 'no' }]} />
        <SelectInput onChange={(val) => formik.setFieldValue('education', val.value)} name="education" label="Education" options={[
          { name: 'High School', value: 'none' },
          { name: 'University', value: 'university' },
          { name: 'Graduate School', value: 'graduate school' }
        ]} />
      </div>
      <div className="flex gap-3">
        <SelectInput onChange={(val) => formik.setFieldValue('pets', val.value)} name="pets" label="Pets" options={[{ name: 'Don\'t Have', value: 'doesn\'t have' }, { name: 'Has Both', value: 'has both' }, { name: 'Have Cats', value: 'has cats' }, { name: 'Have Dogs', value: 'has dogs' }]} />
        <SelectInput onChange={(val) => formik.setFieldValue('job', val.value)} name="job" label="Job" options={[
          { name: 'Business & Sales', value: 'Business & Sales' },
          { name: 'Healthcare & Legal', value: 'Healthcare & Legal' },
          { name: 'Miscellaneous', value: 'Miscellaneous' },
          { name: 'Services & Hospitality', value: 'Services & Hospitality' },
          { name: 'Technology & Engineering', value: 'Technology & Engineering' },
        ]} />
      </div>
      <div className="flex gap-3 items-end">
        <SelectInput onChange={(val) => formik.setFieldValue('offspring', val.value)} name="offspring" label="Children" options={[
          { name: 'Don\'t Want', value: 'doesn\'t want kids' },
          { name: 'Have Kids', value: 'has kids' },
          { name: 'Want Kids', value: 'wants kids' }
        ]} />
        <Button className="flex-1" size={"lg"}>Submit</Button>
      </div>
    </form>
  )
}

export default AboutMeForm