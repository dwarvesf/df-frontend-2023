'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Link from 'next/link'
// import { useRouter } from 'next/navigation'
import client from '../api'
import {
  getCredentials,
  removeCredentials,
  storeCredentials,
} from '../../token/TokenContext'
import { SignupRequest } from '../type/auth'

const useAuth = (user?: string) => {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const router = useRouter()

  const signup = async ({
    fullName,
    email,
    password,
    avatar,
  }: SignupRequest) => {
    try {
      const response = await client.post('/auth/signup', {
        fullName,
        email,
        password,
        avatar,
      })
      const { data } = response.data
      storeCredentials(data.accessToken)
      toast.success('success', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
      })
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error',
        position: 'top-right',
      })
      console.error(error.message)
      console.error('Signup failed:', error)
      throw error
    }
  }
  const login = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    try {
      const response = await client.post('/auth/login', {
        email,
        password,
      })
      const { data } = response.data
      setIsLogin(true)

      storeCredentials(data.accessToken)
      router.replace('/book')
      toast.success(data.message, {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error',
        position: 'top-right',
      })
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    const storedLoginStatus: string | null = getCredentials()

    if (storedLoginStatus) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
    if (isLogin) router.replace('/book')
  }, [isLogin, router])

  const onLogin = async () => {
    const token: string | null = getCredentials()
    if (token) {
      storeCredentials(token)
      setIsLogin(true)
      return true
    }
    return false
  }

  const logout = () => {
    removeCredentials()
    setIsLogin(false)
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error(error)
    }
  }
  const render = (): React.JSX.Element => {
    if (!isLogin)
      return (
        <nav className="hidden md:flex md:grow">
          {/* Desktop sign in links */}
          <ul className="flex grow justify-end flex-wrap items-center ">
            <li>
              <Link
                href="/login"
                className="px-4 py-2 font-medium text-slate-600 dark:text-slate-100 hover:text-gray-900  flex items-center transition-all duration-100 ease-in-out mr-4"
              >
                Login
              </Link>
            </li>
            <li className="">
              <Link
                href="/signup"
                className="px-4 py-2 font-medium inline-flex items-center justify-center border border-transparent leading-snug ease-in-out h-full ml-3 bg-gray-800 dark:bg-gray-50 hover:bg-gray-600 dark:hover:bg-gray-300 transition-all duration-100 text-white dark:text-gray-800 rounded-lg"
              >
                <span className="h-full">Sign up</span>
              </Link>
            </li>
          </ul>
        </nav>
      )
    return (
      <div>
        <span>{user}</span>

        <button
          onClick={handleLogout}
          className="px-4 py-2 font-medium inline-flex items-center justify-center border border-transparent leading-snug ease-in-out ml-3 bg-gray-800 dark:bg-gray-50 hover:bg-gray-600 dark:hover:bg-gray-300 transition-all duration-100 text-white dark:text-gray-800 rounded-lg"
        >
          <span className="h-full">Log out</span>
        </button>
      </div>
    )
  }

  return { login, signup, onLogin, render }
}

export default useAuth
