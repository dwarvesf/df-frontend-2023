'use client'

import { useState, createContext } from 'react'
// import Script from 'next/script'
import { useParams } from 'next/navigation'
// import { Layout } from 'antd'
import MyHeader from './Header'
import { LayoutProps } from '../_types/Layout.types'

const ThemeContext = createContext(false)
// const { Header, Content } = Layout

const MyLayout = ({ children }: LayoutProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const params = useParams()

  const handleSwitchTheme = () => {
    setIsDarkMode((oldValue) => !oldValue)
  }

  if (params.login) {
    console.log('Helloooooo')
  }

  return (
    <ThemeContext.Provider value={isDarkMode}>
      <MyHeader isDarkMode={isDarkMode} handleSwitchTheme={handleSwitchTheme} />
      {children}
    </ThemeContext.Provider>
  )
}

export default MyLayout
