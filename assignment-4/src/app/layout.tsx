import './globals.css'
import type { Metadata } from 'next'
import Layout from '../../components/Layout'

export const metadata: Metadata = {
  title: 'Bookstore',
  description: 'Bookstore app for FE course',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Layout>{children}</Layout>
}
