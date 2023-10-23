import React from 'react'

interface TableProps {
  display: () => React.JSX.Element[]
}

export default function Table({ display }: TableProps): React.JSX.Element {
  const tableFormat = 'p-4 border-2 dark:border-sky-500 border-red-500'
  return (
    <div className="h-full w-full">
      <table
        className={`border-solid p-4 w-11/12 text-md text-left m-auto ${tableFormat}`}
      >
        <thead className="p-4 h-16">
          <tr className="">
            <th className={`text-xl w-1/2 ${tableFormat} `}>Name</th>
            <th className={`text-xl r w-1/5 ${tableFormat}`}>Author</th>
            <th className={`text-xl w-2/12 ${tableFormat} `}>Topic</th>
            <th className={`text-xl ${tableFormat}`}>Action</th>
          </tr>
        </thead>
        <tbody>{display()}</tbody>
      </table>
    </div>
  )
}
