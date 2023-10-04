import React from 'react'

export default function Table({ display }) {
  return (
    <div className="h-full w-full">
      <table className="border-solid border-2 dark:border-sky-500 border-red-500 w-11/12 text-md text-left m-auto">
        <thead className="p-4 h-16">
          <tr className="">
            <th className="text-xl w-1/2 p-4 border-x-2 dark:border-sky-500 border-red-500">
              Name
            </th>
            <th className="text-xl r w-1/5 p-4 border-x-2 dark:border-sky-500 border-red-500">
              Author
            </th>
            <th className="text-xl w-1/5 p-4 border-x-2 dark:border-sky-500 border-red-500">
              Topic
            </th>
            <th className="text-xl p-4 border-2 dark:border-sky-500 border-red-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody>{display}</tbody>
      </table>
    </div>
  )
}
