// 'use client'

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import { useState } from 'react'
import Header from '../../components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bookstore',
  description: 'Bookstore app for FE course',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const [dark, setDark] = useState(false)

  // const handleSwitchTheme = () => {
  //   setDark((oldValue) => !oldValue)
  // }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header
        // dark={dark} handleSwitchTheme={handleSwitchTheme}
        />
        <main className="bg-white px-2 lg:px-4 py-2.5 min-h-screen dark:bg-gray-800">
          {children}
        </main>
      </body>
    </html>
  )
}
