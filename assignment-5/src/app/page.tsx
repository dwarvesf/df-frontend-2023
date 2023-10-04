// 'use client'

// import { useState, useEffect } from 'react'
// import { useForm, SubmitHandler } from 'react-hook-form'
// import AddBookModal from '../../components/AddBookModal'
// import { defaultBooks, emptyBook } from '../../utils/constants'
// import { getData } from '../../utils/data'
import Homepage from './_pages/Homepage'

export default function Home() {
  // const { register, handleSubmit } = useForm<AddBookInputs>()

  // const [books, setBooks] = useState<Book[]>([])

  // // value of the search input field
  // const [searchValue, setSearchValue] = useState('')

  // // for search purpose
  // const [booksFiltered, setBooksFiltered] = useState<Book[]>([])
  // const [openModal, setOpenModal] = useState(false)
  // const [openDeleteModal, setOpenDeleteModal] = useState(false)
  // const [displayMessage, setDisplayMessage] = useState(false)
  // const [page, setPage] = useState(1)
  // const [bookToBeDeleted, setBookToBeDeleted] = useState<Book>(emptyBook)

  // useEffect(() => {
  //   const dat = getData()

  //   if (dat.length === 0) {
  //     setBooks(defaultBooks)
  //     setBooksFiltered(defaultBooks)
  //     localStorage.setItem('books', JSON.stringify(defaultBooks))
  //     console.log('Hello')
  //   } else {
  //     setBooks(dat)
  //     setBooksFiltered(dat)
  //   }
  // }, [])

  // useEffect(() => {
  //   setPage((currentPage) => {
  //     if (booksFiltered.length === 0) {
  //       return 1
  //     }
  //     if ((currentPage - 1) * 4 >= booksFiltered.length) {
  //       return currentPage - 1
  //     }
  //     return currentPage
  //   })
  // }, [booksFiltered])

  // useEffect(() => {
  //   if (displayMessage) {
  //     const timer = setTimeout(() => {
  //       setDisplayMessage(false)
  //     }, 3000)
  //     return () => clearTimeout(timer)
  //   }
  // }, [displayMessage])

  // const onSubmit: SubmitHandler<AddBookInputs> = (data) => {
  //   if (data.name && data.author && data.topic) {
  //     setSearchValue('')
  //     const newBooks = [
  //       ...books,
  //       {
  //         id: Date.now(),
  //         name: data.name,
  //         author: data.author,
  //         topic: data.topic,
  //       },
  //     ]
  //     setBooks(newBooks)
  //     localStorage.setItem('books', JSON.stringify(newBooks))
  //     setBooksFiltered(newBooks)
  //     setDisplayMessage(true)
  //     setOpenModal(false)
  //   }
  // }

  // const handleDeleteBook = (id: number): void => {
  //   const newBooks = books.filter((book) => book.id !== id)
  //   setBooks(newBooks)
  //   localStorage.setItem('books', JSON.stringify(newBooks))
  //   setBooksFiltered(newBooks)
  //   setSearchValue('')
  //   setOpenDeleteModal(false)
  //   setDisplayMessage(true)
  //   setBookToBeDeleted(emptyBook)
  // }

  // const handleOpenDeleteModal = (book: Book) => {
  //   setBookToBeDeleted(book)
  //   setOpenDeleteModal(true)
  // }

  // const handleSearch = (value: string): void => {
  //   setSearchValue(value)
  //   let reg = /\[]/gi
  //   try {
  //     reg = new RegExp(value, 'gi')
  //   } catch (error) {
  //     console.log(error)
  //   }

  //   const search = books.filter((book) => book.name.search(reg) > -1)
  //   setBooksFiltered(search)
  // }

  return (
    // <div>
    //   <ActionsRow
    //     searchValue={searchValue}
    //     setOpenModal={setOpenModal}
    //     handleSearch={handleSearch}
    //   />
    //   <Table
    //     page={page}
    //     books={booksFiltered}
    //     setPage={setPage}
    //     handleOpenDeleteModal={handleOpenDeleteModal}
    //   />
    //   <AddBookModal
    //     openModal={openModal}
    //     setOpenModal={setOpenModal}
    //     handleAddBook={() => handleSubmit(onSubmit)}
    //     register={register}
    //   />
    //   <ConfirmDeleteModal
    //     book={bookToBeDeleted}
    //     setOpenDeleteModal={setOpenDeleteModal}
    //     openDeleteModal={openDeleteModal}
    //     handleDeleteBook={handleDeleteBook}
    //   />
    //   <SuccessMessage displayMessage={displayMessage} />
    // </div>
    <Homepage />
  )
}
