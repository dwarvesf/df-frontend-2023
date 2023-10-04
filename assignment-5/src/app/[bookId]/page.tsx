// 'use client'

// import { useState, useEffect } from 'react'
// import { useParams, useRouter } from 'next/navigation'
// import { AiOutlineArrowLeft } from 'react-icons/ai'
// import { Book } from '../_types/Homepage.types'
// import { emptyBook } from '../_utils/constants'
// import { getData } from '../_utils/data'

// const BookDetail = ({ params }: { params: { bookId: string } }) => {
// const [books, setBooks] = useState<Book[]>([])
// const [book, setBook] = useState<Book>(emptyBook)
// const [openDeleteModal, setOpenDeleteModal] = useState(false)
// const [displayMessage, setDisplayMessage] = useState(false)
// const [displayErrorPage, setDisplayErrorPage] = useState(false)
//   const params = useParams()
//   const router = useRouter()

// useEffect(() => {
//   const dat = getData()
//   setBooks(dat)

//   const id = Number(params.bookId) || -1

//   if (id === -1) {
//     setDisplayErrorPage(true)
//   }

//   const bookItem = dat.find((item) => item.id === Number(id)) || emptyBook
//   setBook(bookItem)
// }, [params.bookId])

// useEffect(() => {
//   if (displayMessage) {
//     const timer = setTimeout(() => {
//       setDisplayMessage(false)
//     }, 2000)
//     return () => clearTimeout(timer)
//   }
// }, [displayMessage])

//   const handleDeleteBook = (id: number): void => {
//     const newBooks = books.filter((book) => book.id !== id)
//     setBooks(newBooks)
//     localStorage.setItem('books', JSON.stringify(newBooks))
//     setOpenDeleteModal(false)
//     setDisplayMessage(true)
//     setTimeout(() => {
//       router.replace('/')
//     }, 1000)
//   }

// if (displayErrorPage) {
//   return (
//     <div className="w-full h-full flex flex-col items-center justify-center mt-10">
//       <p className="text-9xl mb-3 font-bold text-cyan-800 dark:text-cyan-200">
//         404
//       </p>
//       <p className="text-2xl mb-5 font-semibold text-cyan-800 dark:text-cyan-200">
//         Page not found
//       </p>
//       <a
//         href="/"
//         className="text-2xl font-semibold text-red-700 hover:underline dark:text-red-200"
//       >
//         <i className="fa-solid fa-arrow-left mr-1" /> Back to home page
//       </a>
//     </div>
//   )
// }

//   return (
//     <div>
//       <a
//         href="/"
//         className="text-sm font-bold text-blue-800 dark:text-blue-200 hover:underline"
//       >
//         <AiOutlineArrowLeft /> Back
//       </a>
//       <h1 className="text-lg my-6 font-bold text-black dark:text-white">
//         {/* {book.name} */} The Phoenix Project
//       </h1>
//       <p className="text-sm mb-1 text-black dark:text-white">
//         {/* <b>Author</b>: {book.author} */} Gene Kim
//       </p>
//       <p className="text-sm mb-6 text-black dark:text-white">
//         {/* <b>Topic</b>: {book.topic} */} Programming
//       </p>
//       <button
//         // onClick={() => setOpenDeleteModal(true)}
//         className="text-sm font-semibold text-red-500 hover:underline dark:text-red-300"
//       >
//         <i className="fa-solid fa-trash mr-1" /> Delete
//       </button>
//     </div>
//   )
// }

// export default BookDetail

'use client'

import { notFound, useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import { Typography, Space, Button, Popconfirm, message } from 'antd'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'
import { getData } from '../_utils/data'
import { Book } from '../_types/Homepage.types'
import { emptyBook } from '../_utils/constants'

const { Text, Title } = Typography

const BookDetail = ({ params: { bookId } }: { params: { bookId: string } }) => {
  const books = getData()
  const book: Book =
    books.find((item) => item.id === Number(bookId)) ?? emptyBook
  const route = useRouter()
  const [messageApi, contextHolder] = message.useMessage()

  if (book.id === -1) {
    notFound()
  }

  const handleDeleteBook = (id: number): void => {
    const newBooks = books.filter((book) => book.id !== id)
    localStorage.setItem('books', JSON.stringify(newBooks))
    messageApi.open({
      type: 'success',
      content: 'Delete success',
    })
    route.replace('/')
  }

  return (
    <Space.Compact direction="vertical" style={{ margin: '1rem' }}>
      {contextHolder}
      <a
        href="/"
        style={{
          padding: '4px',
          fontSize: '18px',
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <AiOutlineArrowLeft style={{ marginRight: '4px' }} /> Back
      </a>
      <Title level={2}>{book.name}</Title>
      <Text style={{ fontSize: '18px', marginBottom: '4px' }}>
        <b>Author</b>: {book.author}
      </Text>
      <Text style={{ fontSize: '18px', marginBottom: '15px' }}>
        <b>Topic</b>: {book.topic}
      </Text>
      <Popconfirm
        title="Delete book"
        description="Are you sure to delete this book?"
        onConfirm={() => handleDeleteBook(book.id)}
        okText="Yes"
        cancelText="No"
      >
        <Button
          type="text"
          danger
          style={{
            fontWeight: 600,
            width: 'fit-content',
            fontSize: '18px',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <BsFillTrashFill style={{ marginRight: '4px' }} /> Delete
        </Button>
      </Popconfirm>
    </Space.Compact>
  )
}

export default BookDetail

// export async function getStaticPaths() {
//   const books = getData()

//   const paths = books.map((book) => ({
//     params: {
//       bookId: book.id,
//     },
//   }))

//   return { paths, fallback: false }
// }

// export const getInitialProps = async (context) => {
//   const bookId = context.params?.bookId as string
//   const books = getData()
//   const book = books.find((b) => b.id === Number(bookId))

//   if (!book) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     // props: {
//     book,
//     // },
//   }
// }
