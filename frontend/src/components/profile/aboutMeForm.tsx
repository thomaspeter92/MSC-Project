import SelectInput from '../selectInput';
import Button from '../button';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAboutInfo } from '../../services/userService';
import { toast } from 'react-toastify';
import colors from 'tailwindcss/colors';

type Props = {
  profile: any;
  user_id: number;
  close: () => void;
};

const AboutMeForm = ({ profile, user_id, close }: Props) => {
  const { mutate, isPending } = useMutation({
    mutationFn: updateAboutInfo,
  });
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      smokes: profile?.smokes || '',
      diet: profile?.diet || '',
      drinks: profile?.drinks || '',
      education: profile?.education || '',
      pets: profile?.pets || '',
      job: profile?.job || '',
      offspring: profile?.offspring || '',
      body_type: profile?.body_type || '',
    },
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          toast.success('Success! About me updated.', {
            style: { backgroundColor: colors.green[100] },
          });
          queryClient.invalidateQueries({ queryKey: ['profile', user_id] });
          close();
        },
        onError: () => {
          toast.error('Error. Please try again');
        },
      });
    },
  });

  console.log(formik.values);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="p-5 bg-white w-[75ch] space-y-5"
    >
      <div className="flex gap-3">
        <SelectInput
          onChange={(val) => formik.setFieldValue('smokes', val.value)}
          defaultValue={formik.values.smokes}
          name="smokes"
          label="Smokes"
          options={[
            { name: 'Yes', value: 'yes' },
            { name: 'No', value: 'no' },
          ]}
        />
        <SelectInput
          onChange={(val) => formik.setFieldValue('diet', val.value)}
          defaultValue={formik.values.diet}
          name="diet"
          label="Diet"
          options={[
            { name: 'Anything', value: 'anything' },
            { name: 'Vegetarian', value: 'vegetarian' },
            { name: 'Vegan', value: 'vegan' },
          ]}
        />
      </div>
      <div className="flex gap-3">
        <SelectInput
          defaultValue={formik.values.drinks}
          onChange={(val) => formik.setFieldValue('drinks', val.value)}
          name="drinks"
          label="Drinks"
          options={[
            { name: 'Yes', value: 'yes' },
            { name: 'No', value: 'no' },
          ]}
        />
        <SelectInput
          onChange={(val) => formik.setFieldValue('education', val.value)}
          defaultValue={formik.values.education}
          name="education"
          label="Education"
          options={[
            { name: 'High School', value: 'none' },
            { name: 'University', value: 'university' },
            { name: 'Graduate School', value: 'graduate school' },
          ]}
        />
      </div>
      <div className="flex gap-3">
        <SelectInput
          onChange={(val) => formik.setFieldValue('pets', val.value)}
          defaultValue={formik.values.pets}
          name="pets"
          label="Pets"
          options={[
            { name: "Don't Have", value: "doesn't have" },
            { name: 'Has Both', value: 'has both' },
            { name: 'Have Cats', value: 'has cats' },
            { name: 'Have Dogs', value: 'has dogs' },
          ]}
        />
        <SelectInput
          onChange={(val) => formik.setFieldValue('job', val.value)}
          defaultValue={formik.values.job}
          name="job"
          label="Job"
          options={[
            { name: 'Business & Sales', value: 'Business & Sales' },
            { name: 'Healthcare & Legal', value: 'Healthcare & Legal' },
            { name: 'Miscellaneous', value: 'Miscellaneous' },
            { name: 'Services & Hospitality', value: 'Services & Hospitality' },
            {
              name: 'Technology & Engineering',
              value: 'Technology & Engineering',
            },
          ]}
        />
      </div>
      <div className="flex gap-3 items-end">
        <SelectInput
          onChange={(val) => formik.setFieldValue('offspring', val.value)}
          defaultValue={formik.values.offspring}
          name="offspring"
          label="Children"
          options={[
            { name: "Don't Want", value: "doesn't want kids" },
            { name: 'Have Kids', value: 'has kids' },
            { name: 'Want Kids', value: 'wants kids' },
          ]}
        />
        <SelectInput
          onChange={(val) => formik.setFieldValue('body_type', val.value)}
          defaultValue={formik.values.body_type}
          name="body_type"
          label="Body Type"
          options={[
            { name: 'Thin', value: 'thin' },
            { name: 'Large', value: 'large' },
            { name: 'Athletic', value: 'athletic' },
            { name: 'Average', value: 'average' },
          ]}
        />
      </div>
      <Button disabled={isPending} className="flex-1 w-full" size={'lg'}>
        Submit
      </Button>
    </form>
  );
};

export default AboutMeForm;
