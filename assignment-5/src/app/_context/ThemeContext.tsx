'use client'

import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useEffect,
  useCallback,
} from 'react'

export interface ThemeContextType {
  isDarkMode: boolean
  handleSwitchTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme && theme === 'dark') {
      setIsDarkMode(true)
      localStorage.setItem('theme', 'dark')
    }

    if (!theme || theme === 'light') {
      setIsDarkMode(false)
      localStorage.setItem('theme', 'light')
    }
  }, [])

  const handleSwitchTheme = useCallback(() => {
    const oldThemeMode = isDarkMode
    setIsDarkMode(!oldThemeMode)
    if (oldThemeMode) {
      localStorage.setItem('theme', 'light')
    } else {
      localStorage.setItem('theme', 'dark')
    }
  }, [isDarkMode])

  const memoizedValue = useMemo(
    () => ({
      isDarkMode,
      handleSwitchTheme,
    }),
    [isDarkMode, handleSwitchTheme],
  )

  return (
    <ThemeContext.Provider value={memoizedValue}>
      {children}
    </ThemeContext.Provider>
  )
}
