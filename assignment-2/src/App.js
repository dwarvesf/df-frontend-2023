import './App.css'
import { useState, useMemo } from 'react'
import Header from './components/Header'
import Button from './components/Button'
import LineBook from './components/LineBook'
import ModalAdd from './components/ModalAdd'
import ModalDelete from './components/ModalDelete'
import Pagination from './components/Pagination/Pagnation'
import useLocalStorage from './utils/hooks/useLocalStorage'

let PageSize = 5

var defaultBooks = [
  {
    id: 1,
    name: 'Refactoring',
    author: 'Martin Fowler',
    topic: 'Programming',
  },
  {
    id: 2,
    name: 'Design Data-Intensive Applications',
    author: 'Martin Kleppman',
    topic: 'Database',
  },
  {
    id: 3,
    name: 'The Phoenix Project',
    author: 'Gene Kim',
    topic: 'DevOps',
  },
  {
    id: 4,
    name: 'The Pragmatic Programmer: Your Journey to Mastery',
    author: 'Andrew Hunt, David Thomas',
    topic: 'Software Development',
  },
  {
    id: 5,
    name: 'Effective Java',
    author: 'Joshua Bloch',
    topic: 'Java Programming',
  },
  {
    id: 6,
    name: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    topic: 'Literature',
  },
  {
    id: 7,
    name: '1984',
    author: 'George Orwell',
    topic: 'Science Fiction',
  },
  {
    id: 8,
    name: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    topic: 'Literature',
  },
]

const localPage = Number(localStorage.getItem("page"));


function Content() {
  const [books, setBooks] = useLocalStorage('books',defaultBooks)
  const [openModalAdd, SetModalAdd] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const [searchValue, setSeachValue] = useState('')
  const [resultSearchBooks, setResultBooks] = useState('')
  const [openModalDelete, setModalDelete] = useState(false)
  const [deleteBook, setDeleteBook] = useState('')

  const [currentPage, setCurrentPage] = useState(1)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return books.slice(firstPageIndex, lastPageIndex)
  }, [currentPage,books])

  function handleSearch(e) {
    setSeachValue(e.target.value)
    if (e.target.value === '') {
      setIsSearch(false)
      return
    }

    setIsSearch(true)
    setResultBooks(
      books.filter((book) => book.name.toLowerCase().includes(searchValue))
    )
  }

  function handleDelete(item) {
    setBooks(books.filter((book) => book.id !== item.id))
  }

  return (
    <>
      <div className="app__container">
        <div className="control">
          <input
            type="text"
            value={searchValue}
            className="search"
            placeholder="Search books"
            onChange={(e) => handleSearch(e)}
          />
          <Button
            onClick={() => {
              SetModalAdd(true)
            }}
          >
            Add book
          </Button>
        </div>

        <div className="table">
          <table className="table__content">
            <thead className="table__header">
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Topic</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isSearch
                ? resultSearchBooks.map((book) => <LineBook book={book} />)
                : currentTableData.map((book) => (
                    <LineBook
                      book={book}
                      setModalDelete={setModalDelete}
                      setDeleteBook={setDeleteBook}
                    />
                  ))}
            </tbody>
          </table>
          {!isSearch ? <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={books.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          /> : <></>}
        </div>
      </div>
      {openModalAdd ? (
        <ModalAdd SetModalAdd={SetModalAdd} books={books} setBooks={setBooks}/>
      ) : null}

      <ModalDelete
        openModalDelete={openModalDelete}
        setModalDelete={setModalDelete}
        book={deleteBook}
        handleDelete={handleDelete}
      />
    </>
  )
}

function App() {
  return (
    <div className="app">
      <Header />
      <Content />
    </div>
  )
}

export default App
