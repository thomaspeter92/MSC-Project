import { RadioGroup } from '@headlessui/react';
import { FormikProps } from 'formik';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Icons } from '../icons';

type Props = {
  formik: FormikProps<any>;
};

const arr = [
  'Cooking',
  'Baking',
  'Traveling',
  'Exercise',
  'Cinema',
  'Fashion',
  'Urban Music',
  'Dance Music',
  'Rock Music',
  'Instruments',
  'Winter Sports',
  'Sports',
  'Outdoor Sports',
  'Reading',
  'Writing',
  'Drawing',
  'Painting',
  'Photography',
  'Gardening',
  'Video Games',
  'Board Games',
  'Card Games',
  'Puzzle Solving',
  'Crafting',
  'Knitting',
  'Sewing',
  'DIY Projects',
  'Home Decorating',
  'Yoga',
  'Meditation',
  'Collecting',
  'Fishing',
  'Camping',
  'Hiking',
  'Swimming',
  'Cycling',
  'Running',
  'Dancing',
  'Karaoke',
  'Magic and Illusion',
  'Stand-up Comedy',
  'Podcasting',
  'Blogging',
  'Vlogging',
  'Social Media',
  'Language Learning',
  'Volunteering',
  'Animal Care',
  'Astronomy',
  'History',
];

const Step3 = ({ formik }: Props) => {
  const [dislikes, setDisikes] = useState<string[]>(formik.values.dislikes);

  const handleSelect = (val: string) => {
    console.log(val);
    if (dislikes.includes(val)) {
      const arr = dislikes.filter((d) => d !== val);
      setDisikes(arr);
      formik.setFieldValue('dislikes', arr);
      return;
    }

    if (dislikes.length < 5) {
      setDisikes([...dislikes, val]);
      formik.setFieldValue('dislikes', [...dislikes, val]);
      return;
    }
  };

  const ErrorIcon = Icons['alertCircle'];

  return (
    <>
      {formik.errors.dislikes ? (
        <p className="flex items-center gap-2 text-red-500 mb-2">
          <ErrorIcon size={20} />
          {formik.errors.dislikes as string}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-5 max-h-[300px] overflow-scroll pt-2">
        {arr?.map((d) => (
          <div key={d}>
            <input
              onChange={() => handleSelect(d)}
              className="hidden"
              type="checkbox"
              id={d + 'checkbox'}
              value={d}
            />
            <label
              htmlFor={d + 'checkbox'}
              className={cn(
                'select-none cursor-pointer capitalize bg-rose-100 text-rose-400 rounded-full px-4 py-2',
                dislikes.includes(d) ? 'bg-rose-500 text-white' : ''
              )}
            >
              {d}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default Step3;
