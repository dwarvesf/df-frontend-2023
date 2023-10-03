'use client'

import Pagination from './Pagination'
import { TableProps } from '../types/Table.types'

const Table = ({ books, handleOpenDeleteModal, page, setPage }: TableProps) => {
  const items = books.slice(4 * (page - 1), 4 * page)

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Author
            </th>
            <th scope="col" className="px-6 py-3">
              Topic
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.name}
              </th>
              <td className="px-6 py-4">{item.author}</td>
              <td className="px-6 py-4">{item.topic}</td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => handleOpenDeleteModal(item)}
                >
                  Delete
                </button>
                <span className="mx-2">|</span>
                <a
                  href={`/${item.id}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination nItems={books.length} currentPage={page} setPage={setPage} />
    </div>
  )
}

export default Table
