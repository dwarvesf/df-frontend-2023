import './App.css'
import { useState, useMemo } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Header, Button, LineBook, ModalAdd, Pagination } from './components'
import ShowText from './components/ShowText'

// Import types
import { Book, BookList } from './types'
import ModalDelete from './components/ModalDelete'

const defaultBooks: BookList = [
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

function Content() {
  const PageSize = 5

  const [books, setBooks] = useLocalStorage('books', defaultBooks)

  // For addd
  const [openModalAdd, SetModalAdd] = useState<boolean>(false)

  // For delete
  const [openModalDelete, setModalDelete] = useState<boolean>(false)
  const [deleteBook, setDeleteBook] = useState<Book>(books[1])

  // For search book
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [searchValue, setSeachValue] = useState<string>('')
  const [resultSearchBooks, setResultBooks] = useState<BookList>(books)

  const [page, setPage] = useState<number>(1)

  const displayBook = useMemo<BookList>(() => {
    const firstPageIndex = (page - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return books.slice(firstPageIndex, lastPageIndex)
  }, [page, books])

  function handleSearch(e) {
    setSeachValue(e.target.value)
    if (e.target.value === '') {
      setIsSearch(false)
      return
    }

    setIsSearch(true)
    setResultBooks(
      books.filter((book) => book.name.toLowerCase().includes(searchValue)),
    )
  }

  const handlePageChange = (page: number) => {
    setPage(page)
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
                ? resultSearchBooks.map((book) => (
                    <LineBook
                      book={book}
                      setModalDelete={setModalDelete}
                      setDeleteBook={setDeleteBook}
                    />
                  ))
                : displayBook.map((bookItem) => (
                    <LineBook
                      book={bookItem}
                      setModalDelete={setModalDelete}
                      setDeleteBook={setDeleteBook}
                    />
                  ))}
            </tbody>
          </table>
        </div>
        {!isSearch ? (
          <div className="pagination__wrapper">
            <Pagination
              totalItems={books.length}
              itemsPerPage={PageSize}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </div>
        ) : null}
      </div>

      {openModalAdd ? (
        <ModalAdd SetModalAdd={SetModalAdd} books={books} setBooks={setBooks} />
      ) : null}

      <ModalDelete
        openModalDelete={openModalDelete}
        setModalDelete={setModalDelete}
        book={deleteBook}
        handleDelete={(item: Book) => 
        {
          setBooks(books.filter((book) => book.id !== item.id))
          if (resultSearchBooks.includes(deleteBook)) {
            setResultBooks(resultSearchBooks.filter((book) => book.id !== item.id))
          }
        }}
      />
    </>
  )
}

function App() {
  return (
    <>
      <Header />
      <Content />
      <ShowText text="123" />
    </>
  )
}

export default App
