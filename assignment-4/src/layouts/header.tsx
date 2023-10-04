import React from 'react'
import { ThemeSwitcher } from '../components/theme/theme-toggle'

export default function Header() {
  return (
    <section className="flex justify-between dark:text-white  border border-solid p-4 head mb-1 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
      <div className="head-title">
        <h1 className="">Bookstore</h1>
      </div>
      <div>
        {' '}
        <ThemeSwitcher />
      </div>
      <div className="head-profile">
        <a href="https://github.com/iTeddy1">
          <h2>iTeddy1</h2>
        </a>
      </div>
    </section>
  )
}
