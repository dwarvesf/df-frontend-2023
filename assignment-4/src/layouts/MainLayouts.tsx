import React from 'react'
import MainBody from './body'
import MainHeader from './header'
import MainFooter from './footer'

function MainLayout() {
  return (
    <div className="">
      <MainHeader />
      <MainBody />
      <MainFooter />
    </div>
  )
}

export default MainLayout
