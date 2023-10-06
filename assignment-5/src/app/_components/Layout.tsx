'use client'

import { usePathname } from 'next/navigation'
import { ConfigProvider, theme } from 'antd'
import MyHeader from './Header'
import { LayoutProps } from '../_types/Layout.types'
import { useTheme } from '../_context/ThemeContext'

const MyLayout = ({ children }: LayoutProps) => {
  const pathname = usePathname()
  const { isDarkMode } = useTheme()
  const { defaultAlgorithm, darkAlgorithm } = theme

  if (pathname === '/login') {
    return (
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    )
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <MyHeader />
      {children}
    </ConfigProvider>
  )
}

export default MyLayout
