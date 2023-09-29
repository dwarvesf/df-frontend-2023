import './App.css'
// import { useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Header, Button, LineBook } from './components'
import ShowText from './components/ShowText'

// Import types
import { Book, BookList } from './types'

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
  const [books, setBooks] = useLocalStorage('books', defaultBooks)

  return (
    <div className="app__container">
      <div className="control">
        <input
          type="text"
          // value={searchValue}
          className="search"
          placeholder="Search books"
          // onChange={(e) => handleSearch(e)}
        />
        <Button
        // onClick={() => {
        //   SetModalAdd(true)
        // }}
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
            {/* {isSearch
                ? resultSearchBooks.map((book) => <LineBook book={book} />)
                : currentTableData.map((book) => (
                    <LineBook
                      book={book}
                      setModalDelete={setModalDelete}
                      setDeleteBook={setDeleteBook}
                    />
                  ))} */}
            {books.map((bookItem) => (
              
              <LineBook
                book={bookItem}    
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
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
