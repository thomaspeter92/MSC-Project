import React, { useState } from 'react'
import { Icons } from "../icons"
import { FormikProps } from "formik"
import { SignUpForm } from "../../pages/Signup"

type Props = {
  formik: FormikProps<SignUpForm>
}

const Step3 = ({ formik }: Props) => {
  const [image, setImage] = useState<File | null>(formik.values.picture)
  const Icon = Icons['upload']
  const ErrorIcon = Icons['alertCircle']


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
    formik.setFieldValue('picture', file)
  };

  return (
    <div>
      {formik.errors.picture ?
        <p className="flex items-center gap-2 text-red-500 mb-2">
          <ErrorIcon size={20} />
          {formik.errors.picture as string}
        </p>
        : null}
      <input
        id="imgUpload"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="bg-rose-100 hidden"
      />
      <label htmlFor="imgUpload" className="flex items-center font-semibold w-fit gap-2 bg-rose-500 text-white py-2 px-4 rounded">
        <Icon size={20} />
        Upload Image
      </label>
      <div className="w-full h-[200px] my-5 relative bg-rose-100 rounded">
        {image ? (
          <img src={URL.createObjectURL(image)} alt="Uploaded" className="object-contain absolute h-full w-full object-center" />
        ) :
          <div className=" w-full h-full  flex flex-col items-center justify-center gap-4">
            <Icon className="text-rose-300" size={100} />
            <p className="font-bold text-rose-400">Select a profile picture to upload</p>
          </div>
        }
      </div>

    </div>
  )
}

export default Step3