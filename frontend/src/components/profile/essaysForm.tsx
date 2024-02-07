import Button from '../button';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import colors from 'tailwindcss/colors';
import { updateEssays } from "../../services/userService";
import TextArea from "../textArea";

type Props = {
  profile: any;
  user_id: number;
  close: () => void;
};

const EssaysForm = ({ profile, user_id, close }: Props) => {
  const { mutate, isPending } = useMutation({
    mutationFn: updateEssays,
  });
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      essay0: profile?.essay0 || '',
      essay1: profile?.essay1 || '',
      essay2: profile?.essay2 || '',
      essay3: profile?.essay3 || '',
      essay4: profile?.essay4 || '',
      essay5: profile?.essay5 || '',
      essay6: profile?.essay6 || '',
      essay7: profile?.essay7 || '',
      essay8: profile?.essay8 || '',
      essay9: profile?.essay9 || '',
    },
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          toast.success('Success! Your essays were updated.', {
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
    <form onSubmit={formik.handleSubmit} className="p-5 bg-white w-[75ch] max-w-[90vw] max-h-[90vh] overflow-scroll space-y-5">
      <TextArea label="Self Summary" />
      <TextArea label="What I'm doing with my life" />
      <TextArea label="I'm really good at..." />
      <TextArea label="The first thing people notice about me is..." />
      <TextArea label="My favorite media is..." />
      <TextArea label="The things I could never do without" />
      <TextArea label="I spend a lot of time thinking about..." />
      <TextArea label="On a typical Friday night I am..." />
      <TextArea label="The most private thing I am willing to admit" />
      <TextArea label="You should message me if..." />
    </form>
  );
};

export default EssaysForm;
