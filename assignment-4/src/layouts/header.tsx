import React from 'react'

export default function Header() {
  return (
    <div className="flex justify-between border border-solid p-4 head mb-1 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
      <div className="head-title">
        <h1 className="">Bookstore</h1>
      </div>
      <div className="head-profile">
        {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
        <a href="https://github.com/iTeddy1">
          <h2>iTeddy1</h2>
        </a>
      </div>
    </div>
  )
}
