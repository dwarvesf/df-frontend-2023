'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CreateModal from '../components/modal/createModal'
import DeleteModal from '../components/modal/deleteModal'
import Table from '../components/table/table'

let action: string | null
let selectedItem: Book
const dataKey: string = 'books'
const maxRecord = 5

interface Book {
  name: string
  author: string
  topic: string
}

function MainBody() {
  const router = useRouter()

  // set State
  const [data, setData] = useState([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [searchItem, setSearchItem] = useState<string>('')
  const [page, setPage] = useState<number>(0)

  // Search book
  const FilterTitle: Array<Book> = useMemo(() => {
    const pattern = new RegExp(searchItem.toLowerCase())
    return data.filter((i: Book) => pattern.test(i.name.toLowerCase()))
  }, [data, searchItem])

  const total = useMemo(() => {
    return Math.ceil(FilterTitle.length / maxRecord)
  }, [data, searchItem])

  useEffect(() => {
    const bookList = JSON.parse(localStorage.getItem(dataKey) || '[]')
    setData(bookList)
  }, [])

  function updateList(data): void {
    localStorage.setItem(dataKey, JSON.stringify(data))
    setData(data)
    setPage(Math.floor((data.length - 1) / maxRecord))
  }

  // Handle Modal

  const openModal = (
    selectedAction: string = 'Create' || 'Delete',
    item?: Book,
  ): void => {
    if (item) selectedItem = item
    action = selectedAction
    setModalOpen(true)
  }

  function closeModal(): void {
    action = null
    setModalOpen(false)
  }

  function displayModal(close) {
    // Add Modal
    if (action === 'Create') {
      return <CreateModal close={close} addBook={addItem} />
    }
    // Delete Modal
    if (action === 'Delete') {
      return (
        <DeleteModal close={close} item={selectedItem} delBook={deleteItem} />
      )
    }
  }

  // Handle Add, Delete Item

  function addItem(newItem: Book) {
    const newList = [newItem, ...data]
    updateList(newList)
    setPage(0)
    setModalOpen(false)
  }

  function deleteItem(item: Book) {
    const index = data.findIndex((i: Book) => i.name === item.name)
    if (index === -1) {
      return
    }
    const newList = [...data]
    newList.splice(index, 1)
    updateList(newList)
    setModalOpen(false)
  }

  function DisplayItem() {
    const pattern = new RegExp(searchItem.toLowerCase())
    const FilterTitle: Array<Book> = data.filter((i: Book) =>
      pattern.test(i.name.toLowerCase()),
    )

    const dataPage: Array<Book> = FilterTitle.slice(
      page * maxRecord,
      (page + 1) * maxRecord,
    )
    return dataPage.map((i: Book) => {
      return (
        <tr className="h-12" key={i.name}>
          <td className="text-black border-2 border-red-500 dark:border-sky-500 dark:text-white">
            {i.name}
          </td>
          <td className="text-black border-2 border-red-500 dark:border-sky-500 dark:text-white">
            {i.author}
          </td>
          <td className="text-black border-2 border-red-500 dark:border-sky-500 dark:text-white">
            {i.topic}
          </td>
          <td className="text-red-500 border-2 border-red-500 dark:border-sky-500">
            <button
              className="m-2 underline decoration-double dark:text-sky-500"
              type="button"
              onClick={() => openModal('Delete', i)}
            >
              <span>Delete</span>
            </button>
            <button
              onClick={() => router.push(`/book/${i.name}`)}
              className="m-2 underline decoration-double dark:text-sky-500"
            >
              View
            </button>
          </td>
        </tr>
      )
    })
  }
  // Pagination
  const paginationBtn: Array<JSX.Element> = Array.from(
    { length: total },
    (_, i) => {
      const unactive =
        'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-white-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white-700 dark:hover:text-black'
      const active =
        'flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
      return (
        // Return a button element.
        <button
          type="button"
          className={`table-page${i === page ? `${active}` : `${unactive}`}`}
          onClick={() => setPage(i)}
          key={i}
        >
          {i + 1}
        </button>
      )
    },
  )

  return (
    <section>
      <div>
        <div className="font-extrabold text-right p-12">
          <input
            type="text"
            className="border dark:text-white text-black font-bold m-4 py-2 px-4 rounded focus:shadow-outline"
            placeholder="Search books..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
          <button
            id="btnAddBook"
            type="button"
            className="dark:bg-sky-500 dark:hover:bg-sky-700 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => openModal('Create')}
          >
            Add Book
          </button>
        </div>
        <Table display={DisplayItem()} />

        <div className="pagination flex justify-end -space-x-px text-sm m-6">
          {paginationBtn}
        </div>
      </div>
      {modalOpen ? displayModal(closeModal) : null}
    </section>
  )
}

export default MainBody
