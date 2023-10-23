'use client'

import React from 'react'
import MainBody from './body'
import MainHeader from './header'
import MainFooter from './footer'

export default function MainLayout() {
  return (
    <div>
      <MainHeader />
      <MainBody />
      <MainFooter />
    </div>
  )
}
