'use client'

import Image from 'next/image'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import PasswordStrengthBar from 'react-password-strength-bar'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupRequest } from '../../api/type/auth'
import {
  SignupSchemaType,
  signupSchema,
} from '../../components/schema/SignupSchema'
import useAuth from '../../api/auth/auth'
import { ThemeSwitcher } from '../../components/Theme/theme-toggle'

export default function SignupPage() {
  // const past = 21321@g@A
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  })
  const router = useRouter()
  const { signup } = useAuth()
  const password: string = watch('password')
  const [signupError, setSignupError] = useState<string>('')

  const onSubmit: SubmitHandler<SignupSchemaType> = async (
    data: SignupRequest,
  ) => {
    setSignupError('')
    const info = {
      avatar: '',
      email: data.email,
      password: data.password,
      fullName: data.fullName,
    }
    try {
      await signup(info)
      router.replace('/login')
      toast.success('success', {
        autoClose: 2000,
        type: 'success',
      })
    } catch (error) {
      setSignupError(error.message)
      console.log(error.message)
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-center">
        {' '}
        <ThemeSwitcher />
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="fullname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="fullname"
                  disabled={isSubmitting}
                  {...register('fullName')}
                  id="fullname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  disabled={isSubmitting}
                  {...register('email')}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              {errors.email && (
                <span className="text-rose-800 block mt-2">
                  {errors.email?.message}
                </span>
              )}{' '}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  disabled={isSubmitting}
                  {...register('password')}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {errors.password && (
                <span className="text-red-800 block mt-2">
                  {errors.password?.message}
                </span>
              )}{' '}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  disabled={isSubmitting}
                  {...register('passwordConfirm')}
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.passwordConfirm && (
                  <span className="text-red-800 block mt-2">
                    {errors.passwordConfirm?.message}
                  </span>
                )}
              </div>
              <PasswordStrengthBar password={password} />
              {signupError && (
                <p className="text-right text-md font-bold text-red-600">
                  {signupError}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 bg-rose-600 hover:bg-rose-700  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-bold text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
