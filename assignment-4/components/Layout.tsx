'use client'

import { useState, createContext } from 'react'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import Header from './Header'
import { LayoutProps } from '../types/Layout.types'

const inter = Inter({ subsets: ['latin'] })
const ThemeContext = createContext(false)

const Layout = ({ children }: LayoutProps) => {
  const [dark, setDark] = useState(false)

  const handleSwitchTheme = () => {
    setDark((oldValue) => !oldValue)
  }

  return (
    <ThemeContext.Provider value={dark}>
      <html lang="en" className={`${dark ? 'dark' : ''}`}>
        <head>
          <Script
            src="https://kit.fontawesome.com/372c90f6b7.js"
            crossOrigin="anonymous"
          />
        </head>
        <body className={inter.className}>
          <Header dark={dark} handleSwitchTheme={handleSwitchTheme} />
          <main className="bg-white px-2 lg:px-4 py-2.5 min-h-[calc(100vh-4rem)] dark:bg-gray-800">
            {children}
          </main>
        </body>
      </html>
    </ThemeContext.Provider>
  )
}

export default Layout
