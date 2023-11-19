'use client'

import axios from 'axios'
import { AiFillGithub, AiFillFacebook } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { PiHandWavingBold } from 'react-icons/pi'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from '../../hooks/useRegisterModal'
import Modals from './Modals'
import Heading from '../Heading'
import Input from '../input/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { useRouter } from 'next/navigation'

import { signIn } from 'next-auth/react'
  
const RegisterModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: '' },
    mode: 'onBlur' // or 'onChange' based on when you want validation to trigger
  })

  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const handleNavigation = (path: string) => {
    router.push(path)
    registerModal.onClose()
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to PlatePilot"
        subtitle="Please register to continue"
        icon={PiHandWavingBold}
        center
      />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={() => register("email", {
            required: "Email is required",
            pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Please enter a valid email"
            }
        })}
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
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      {/* <Button
        outline
        label="Continue with Facebook"
        icon={AiFillFacebook}
        onClick={() => signIn('facebook')}
      /> */}
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
        View our
        <span
          className="mx-1 hover:font-bold cursor-pointer"
          onClick={() => handleNavigation('/about/privacy-policy')}
        >
          Privacy Policy
        </span>
        or
        <span
          className="mx-1 hover:font-bold cursor-pointer"
          onClick={() => handleNavigation('/about/terms-of-use')}
        >
          Terms of Use
        </span>
      </div>
    </div>
  )
  
  const onRegister: SubmitHandler<FieldValues> = (data) => {
    // turn on the loading indicator
    setIsLoading(true);
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
        title="Register"
        body={bodyContent}
        footer={footerContent}
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onRegister)}
        actionLabel="Register"
      />
    </div>
  )
}

export default RegisterModal
