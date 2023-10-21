import React, { useEffect } from 'react'
import Image from 'next/image'
import { ThemeSwitcher } from '../components/Theme/theme-toggle'
import useAuth from '../api/auth/auth'
import { GetUserName, useUserState } from '../api/user/user'

export default function MainHeader() {
  const { data } = GetUserName()
  const { user, updateUser } = useUserState()

  useEffect(() => {
    if (data && data.data.data.fullName !== user.name) {
      updateUser({ name: data.data.data.fullName })
    }
  }, [data, updateUser, user.name])

  const { render } = useAuth(user.name)
  return (
    <header className="w-full z-30 md:bg-opacity-90 transition duration-300 border-b-2">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 mb-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className=" shrink-0 mr-4">
            <Image src="/df-logo.png" alt="logo" width={64} height={40} />
          </div>
          <ThemeSwitcher />
          {render()}
        </div>
      </div>
    </header>
  )
}
