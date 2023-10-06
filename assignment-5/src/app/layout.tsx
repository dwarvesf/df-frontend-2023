import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MyLayout from './_components/Layout'
import { ThemeProvider } from './_context/ThemeContext'

export const metadata: Metadata = {
  title: 'Bookstore',
  description: 'Bookstore app for FE course',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <head>
      <Script
        src="https://kit.fontawesome.com/372c90f6b7.js"
        crossOrigin="anonymous"
      />
    </head> */}
      <body className={inter.className} style={{ minHeight: '100vh' }}>
        <ThemeProvider>
          <MyLayout>{children}</MyLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
