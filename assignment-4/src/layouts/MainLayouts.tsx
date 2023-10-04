import React from 'react'
import MainHeader from './header'
import MainBody from './body'
import MainFooter from './footer'

function MainLayout() {
  return (
    <main className="bg-slate-50 dark:bg-slate-900">
      <MainHeader />
      <MainBody />
      <MainFooter />
    </main>
  )
}

export default MainLayout
