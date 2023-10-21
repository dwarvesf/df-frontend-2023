'use client'

import { useState } from 'react'
import Link from 'next/link'
import PasswordStrengthBar from 'react-password-strength-bar'
import { toast } from 'react-toastify'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  LoginSchemaType,
  LoginSchema,
} from '../../components/schema/LoginSchema'
import useAuth from '../../api/auth/auth'
import { ThemeSwitcher } from '../../components/Theme/theme-toggle'

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { login } = useAuth()
  const [loginError, setLoginError] = useState<string>('')

  const password = watch('password')
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    const info = {
      email: data.email,
      password: data.password,
    }
    try {
      await login(info)
      toast.success('success', {
        autoClose: 2000,
        type: 'success',
      })
    } catch (error) {
      console.log(error)
      toast.error('login failed')
      setLoginError(error.message)
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 ">
      <div className="flex items-center justify-center">
        {' '}
        <ThemeSwitcher />
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="fixed bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <div className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Login To Your Account
          </div>

          <div className="mt-10">
            <form
              className="space-y-4 md:space-y-6 text-gray-900 md:text-2xl dark:text-white"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs sm:text-sm tracking-wide "
                >
                  E-Mail Address:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>

                  <input
                    id="email"
                    disabled={isSubmitting}
                    {...register('email')}
                    type="email"
                    name="email"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="E-Mail Address"
                  />
                </div>
                {errors.email && (
                  <span className="text-rose-800 block mt-2">
                    {errors.email?.message}
                  </span>
                )}{' '}
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="mb-1 text-xs sm:text-sm tracking-wide"
                >
                  Password:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  </div>
                  <input
                    id="password"
                    disabled={isSubmitting}
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Password"
                  />
                </div>
                {errors.password && (
                  <span className="text-red-800 block mt-2">
                    {errors.password?.message}
                  </span>
                )}{' '}
              </div>

              <PasswordStrengthBar password={password} />

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      onChange={() => setShowPassword(!showPassword)}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Show password
                    </label>
                  </div>
                </div>
              </div>
              {loginError && (
                <p className="text-sm font-bold text-red-400">{loginError}</p>
              )}
              <div className="flex w-full">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base dark:bg-sky-600 dark:hover:bg-sky-700 bg-rose-600 hover:bg-rose-700 rounded py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2">Login</span>

                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
              <p className="text-sm font-light">
                Don’t have an account yet?{' '}
                <Link
                  href="/signup"
                  className="font-bold text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
