import React from 'react'
import MainBody from './body'
import MainHeader from './header'
import MainFooter from './footer'

function MainLayout() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900">
      <MainHeader />
      <MainBody />
      <MainFooter />
    </div>
  )
}

export default MainLayout
