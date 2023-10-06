'use client'

import { notFound, useRouter } from 'next/navigation'
import { Typography, Space, Button, Popconfirm, message } from 'antd'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'
import { getData } from '../_utils/data'
import { Book } from '../_types/Homepage.types'
import { emptyBook } from '../_utils/constants'
import { useTheme } from '../_context/ThemeContext'

const { Text, Title } = Typography

const BookDetail = ({ params: { bookId } }: { params: { bookId: string } }) => {
  const { isDarkMode } = useTheme()
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
    <Space.Compact
      direction="vertical"
      style={{
        padding: '1rem',
        width: '100%',
        minHeight: 'calc(100vh - 45.09px)',
        backgroundColor: isDarkMode ? 'rgb(36,37,38)' : 'white',
      }}
    >
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
        style={{ boxShadow: '1px 1px 1px rgba(255,255,255,0.25)' }}
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
