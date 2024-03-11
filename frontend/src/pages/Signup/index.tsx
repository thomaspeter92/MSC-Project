import { useState } from 'react';
import SideButton from '../../components/signUp/sideButton';
import Step1 from '../../components/signUp/step1';
import Button from '../../components/button';
import { useFormik, FormikProps } from 'formik';
import Step2 from '../../components/signUp/step2';
import Step4 from '../../components/signUp/step4';
import Step3 from '../../components/signUp/step3';
import Step5 from '../../components/signUp/step5';
import { Icons } from '../../components/icons';
import {
  step1Validator,
  step2Validator,
  step3Validator,
  step4Validator,
  step5Validator,
} from '../../lib/validations/userValidation';
import { useMutation } from '@tanstack/react-query';
import { signUp, updateProfilePicture } from '../../services/userService';
import { useModal } from '../../hooks/useModal';
import Modal from '../../components/modal';
import { Link } from 'react-router-dom';

export type SignUpForm = {
  first_name: string;
  last_name: string;
  age: string;
  email: string;
  sex: string;
  orientation: string;
  likes: [];
  dislikes: [];
  picture: any;
  password: string;
  confirm_password: string;
};

type Props = {};

const SignUp = ({}: Props) => {
  const [step, setStep] = useState(1);
  const SuccessIcon = Icons['checkCircle'];
  const { open, toggleModal } = useModal(false);

  const { mutate } = useMutation({ mutationFn: signUp });
  const { mutate: postPicture } = useMutation({
    mutationFn: updateProfilePicture,
  });

  const stepBack = () => {
    if (step !== 1) setStep(step - 1);
  };

  const formik: FormikProps<SignUpForm> = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      age: '',
      email: '',
      sex: '',
      orientation: '',
      likes: [],
      dislikes: [],
      picture: null,
      password: '',
      confirm_password: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema:
      step === 1
        ? step1Validator
        : step === 2
          ? step2Validator
          : step === 3
            ? step3Validator
            : step === 4
              ? step4Validator
              : step5Validator,
    onSubmit: (values) => {
      console.log('submit');
      if (step === 5) {
        // remove picture (send later) and confirm password (not needed)
        let { confirm_password, picture, ...params } = values;
        mutate(params, {
          onSuccess: () => {
            // if success post image.
            const formData = new FormData();
            formData.append('image', picture as any);
            formData.append('email', params.email);
            postPicture(formData, {
              onSuccess: () => {
                setStep(step + 1);
              },
              onError: () => {
                toggleModal();
              },
            });
          },
          onError: () => {
            toggleModal();
          },
        });
        return;
      }
      setStep(step + 1);
    },
  });

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-5">
      <div className="rounded-lg shadow-main flex">
        <div className="bg-rose-400 p-5 space-y-1 rounded-l-lg">
          <SideButton
            active={step === 1}
            onClick={() => setStep(1)}
            step={1}
            text="Personal Details"
          />
          <SideButton
            active={step === 2}
            onClick={() => setStep(2)}
            step={2}
            text="Likes"
          />
          <SideButton
            active={step === 3}
            onClick={() => setStep(3)}
            step={3}
            text="Disikes"
          />
          <SideButton
            active={step === 4}
            onClick={() => setStep(4)}
            step={3}
            text="Profile Picture"
          />
          <SideButton
            active={step === 5}
            onClick={() => setStep(5)}
            step={4}
            text="Confirm Password"
          />
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-5 space-y-8 w-[550px] min-h-[500px] max-w-full rounded-r-lg flex flex-col"
        >
          {/* HEADER SECTION */}
          <div className="border-b border-gray-200 pb-5 space-y-2">
            <h2 className="text-rose-500">Complete your profile</h2>
            <p className="text-gray-500">
              Please answer a few questions about yourself
            </p>
          </div>
          <div className="flex-1">
            {step === 1 ? (
              <Step1 formik={formik} />
            ) : step === 2 ? (
              <Step2 formik={formik} />
            ) : step === 3 ? (
              <Step3 formik={formik} />
            ) : step === 4 ? (
              <Step4 formik={formik} />
            ) : step === 5 ? (
              <Step5 formik={formik} />
            ) : step === 6 ? (
              <div className="w-full h-full bg-rose-100 gap-2 flex flex-col items-center justify-center">
                <SuccessIcon size={50} className="text-rose-300" />
                <h3 className="text-rose-500">Sign up successful!</h3>
                <p className="text-gray-500">
                  You can now log in with your email and password
                </p>
              </div>
            ) : null}
          </div>
          {/* BUTTON AREA */}
          <div className=" flex items-center gap-5 justify-between border-t border-gray-200 pt-5">
            {step !== 1 ? (
              <Button
                type="button"
                onClick={stepBack}
                intent="gray"
                size={'lg'}
              >
                Back
              </Button>
            ) : null}
            {step < 6 ? (
              <Button
                type="submit"
                size={'lg'}
                className="w-32 ml-auto"
                intent="primary"
              >
                Continue
              </Button>
            ) : null}
            {step === 6 ? (
              <Link to={'/login'}>
                <Button
                  type="button"
                  size={'lg'}
                  className="w-32 ml-auto"
                  intent="primary"
                >
                  Log In
                </Button>
              </Link>
            ) : null}
          </div>
        </form>
      </div>
      <Modal open={open} onClose={toggleModal}>
        <div className="text-center max-w-[55ch] space-y-3">
          <h3 className="mt-5 text-rose-500">An Error Occured</h3>
          <p>
            We were unable to process the signup request. Please check your
            inputs and try again. If the problem persists, contact customer
            support.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default SignUp;
