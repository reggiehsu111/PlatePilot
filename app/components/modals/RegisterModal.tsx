'use client'

import axios from 'axios'
import { AiFillGithub, AiFillFacebook } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { PiHandWavingBold } from 'react-icons/pi'
import { useCallback, useState, useEffect } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from '../../hooks/useRegisterModal'
import Modals from './Modals'
import Heading from '../Heading'
import Input from '../input/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Define validation schema for form using yup
const validationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string()
    .email()
    .required(),
  password: yup.string()
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
});
  
interface FormValues {
  name: string
  email: string
  password: string
}

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: { name: '', email: '', password: '' },
    resolver: yupResolver(validationSchema)
  })

  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to MTSA marketplace"
        subtitle="Please register to continue"
        icon={PiHandWavingBold}
        center
      />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        type="name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  useEffect(() => {
    if (errors.password) {
      toast.error(
        'Password must be at least 8 characters with both LETTERS and NUMBERS',
        { duration: 6000 }
      )
    }
  }, [errors.password])

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Facebook"
        icon={AiFillFacebook}
        onClick={() => signIn('facebook')}
      />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="flex flex-row justify-center items-center gap-2">
        <div className="text-[#00274C]">Already have an account?</div>
        <div
          onClick={toggle}
          className="text-[#00274C] font-bold cursor-pointer hover:opacity-50"
        >
          Login
        </div>
      </div>
      <div className="flex justify-center text-sm">
        <Link href="/about/privacy-policy">View our Privacy Policy</Link>
      </div>
    </div>
  )

  
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // turn on the loading indicator
    setIsLoading(true)
    axios
      .post('/api/register', data)
      .then((response) => {
        // Check if there's an error in the response data
        if (response.data.error) {
          toast.error(response.data.error)
        } else {
          registerModal.onClose()
          toast.success('Successfully registered!')
        }
      })
      .catch((error) => {
        toast.error('Something went wrong')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div>
      <Modals
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        body={bodyContent}
        footer={footerContent}
        actionLabel="Register"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
         />
    </div>
  );
}

export default RegisterModal
