import './App.css'
import React, { useState, useEffect, useMemo } from 'react'
import CreateModal from './content/modal/create'
import DeleteModal from './content/modal/delete'
import allBooks from './data'

let action: string | null
let selectedItem: Book
const dataKey: string = 'books'
const maxRecord = 5

interface Book {
  name: string
  author: string
  topic: string
}
function App() {
  // set State
  const [data, setData] = useState([...allBooks])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [searchItem, setSearchItem] = useState<string>('')
  const [page, setPage] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    const bookList = JSON.parse(localStorage.getItem(dataKey) || '[]')
    setData(bookList)
  }, [])

  useEffect(() => {
    NumberOfPages()
  })

  function updateList(data): void {
    localStorage.setItem(dataKey, JSON.stringify(data))
    setData(data)
    setPage(Math.floor((data.length - 1) / maxRecord))
  }

  // Handle Modal

  function openModal(
    selectedAction: string = 'Create' || 'Delete',
    item?: Book,
  ): void {
    if (item) selectedItem = item
    action = selectedAction
    setModalOpen(true)
  }

  function closeModal(): void {
    action = null
    setModalOpen(false)
  }

  function displayModal(close: any) {
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
    const newList = [...data, newItem]
    updateList(newList)
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

  // Search book
  const FilterTitle: Array<Book> = useMemo(() => {
    const pattern = new RegExp(searchItem.toLowerCase(), 'g')
    return data.filter((i: Book) => pattern.test(i.name.toLowerCase()))
  }, [data, searchItem])

  function NumberOfPages(): void {
    const totalPageCount = Math.ceil(FilterTitle.length / maxRecord)
    setTotal(totalPageCount)
  }

  function DisplayItem() {
    const pattern = new RegExp(searchItem.toLowerCase(), 'g')
    const FilterTitle: Array<Book> = data.filter((i: Book) =>
      pattern.test(i.name.toLowerCase()),
    )

    const dataPage: Array<Book> = FilterTitle.slice(
      page * maxRecord,
      (page + 1) * maxRecord,
    )

    return dataPage.map((i: Book) => {
      return (
        <tr key={i.name}>
          <td className="table-title name">{i.name}</td>
          <td className="table-title author">{i.author}</td>
          <td className="table-title topic">{i.topic}</td>
          <td>
            <button
              className="table-button"
              type="button"
              onClick={() => openModal('Delete', i)}
            >
              <span>Delete</span>
            </button>
          </td>
        </tr>
      )
    })
  }

  const paginationBtn: Array<JSX.Element> = Array.from(
    { length: total },
    (_, i) => (
      // Return a button element.
      <button
        type="button"
        className={`table-page ${i === page ? 'active' : ''}`}
        onClick={() => setPage(i)}
        key={i}
      >
        {i + 1}
      </button>
    ),
  )
  return (
    <div>
      <nav className="head">
        <div className="head-title">
          <h1>Bookstore</h1>
        </div>
        <div className="head-profile">
          {/* <img alt="logo" src="/public/df-logo.png"/> */}
          <a href="https://github.com/iTeddy1">
            <h2>iTeddy1</h2>
          </a>
        </div>
      </nav>
      <main>
        <div className="search">
          <input
            type="text"
            className="search-input"
            placeholder="Search books..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
          <button
            id="btnAddBook"
            type="button"
            onClick={() => openModal('Create')}
          >
            Add Book
          </button>
        </div>

        <div className="table">
          <table>
            <thead>
              <tr>
                <th className="table-title name">Name</th>
                <th className="table-title author">Author</th>
                <th className="table-title topic">Topic</th>
                <th className="table-title action">Action</th>
              </tr>
            </thead>
            <tbody>{DisplayItem()}</tbody>
          </table>
          <div className="pagination">{paginationBtn}</div>
        </div>
      </main>

      {modalOpen ? displayModal(closeModal) : null}

      <footer>
        Made by{' '}
        <span>
          <a href="https://github.com/iTeddy1">@Teddy</a>
        </span>{' '}
        and
        <span>
          <a href="https://github.com/dwarvesf">@Dwarves</a>
        </span>
      </footer>
    </div>
  )
}

export default App
