'use client'

import { useState, useEffect } from 'react'
import {
  ConfigProvider,
  // theme,
  Button,
  Table,
  Space,
  Input,
  message,
  Popconfirm,
} from 'antd'
import { BiSearchAlt2 } from 'react-icons/bi'
import type { ColumnsType } from 'antd/es/table'
import BookModal from '../_components/BookModal'
import { defaultBooks, emptyBook } from '../_utils/constants'
import { getData } from '../_utils/data'
import { Book, TableDataType } from '../_types/Homepage.types'

const Homepage = () => {
  // const { defaultAlgorithm, darkAlgorithm } = theme
  const [messageApi, contextHolder] = message.useMessage()

  //   const [isDarkMode, setIsDarkMode] = useState(false)

  // value of the search input field
  const [searchValue, setSearchValue] = useState('')

  // for search purpose
  const [booksFiltered, setBooksFiltered] = useState<Book[]>([])
  const [openAddBookModal, setOpenAddBookModal] = useState(false)
  const [openEditBookModal, setOpenEditBookModal] = useState(false)
  const [books, setBooks] = useState<Book[]>([])
  const [bookEdit, setBookEdit] = useState<Book>(emptyBook)

  useEffect(() => {
    const dat = getData()

    if (dat.length === 0) {
      setBooks(defaultBooks)
      setBooksFiltered(defaultBooks)
    } else {
      setBooks(dat)
      setBooksFiltered(dat)
    }
  }, [])

  const tableColumns: ColumnsType<TableDataType> = [
    {
      title: '#',
      dataIndex: '#',
      key: '#',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Topic',
      dataIndex: 'topic',
      key: 'topic',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Delete book"
            description="Are you sure to delete this book?"
            onConfirm={() => handleDeleteBook(record['#'])}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger>
              Delete
            </Button>
          </Popconfirm>
          |{' '}
          <Button type="link" href={`/${record['#']}`}>
            View
          </Button>
          |{' '}
          <Button
            type="text"
            onClick={() => {
              const bookToEdit =
                books.find((book) => book.id === Number(record['#'])) ||
                emptyBook
              setBookEdit(bookToEdit)
              setOpenEditBookModal(true)
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ]

  const tableData: TableDataType[] = booksFiltered.map((book) => {
    return {
      key: book.id,
      '#': book.id,
      name: book.name,
      author: book.author,
      topic: book.topic,
      action: '',
    }
  })

  //   const handleSwitchTheme = (): void => {
  //     setIsDarkMode((previousValue) => !previousValue)
  //   }

  const handleCloseAddBookModal = (): void => {
    setOpenAddBookModal(false)
  }

  const handleCloseEditBookModal = (): void => {
    setOpenEditBookModal(false)
  }

  const handleAddBook = (newBook: Book): void => {
    if (newBook.name && newBook.author && newBook.topic) {
      const newBooks = [...books, newBook]
      setSearchValue('')
      setBooks(newBooks)
      localStorage.setItem('books', JSON.stringify(newBooks))
      setBooksFiltered(newBooks)
      handleSuccessMessage('Create')
      handleCloseAddBookModal()
    }
  }

  const handleEditBook = (newBook: Book): void => {
    const { id, name, author, topic } = newBook
    if (id !== -1 && name && author && topic) {
      const newBooks = books.map((book) => {
        if (id === book.id) {
          return newBook
        }
        return book
      })

      setBooks(newBooks)
      localStorage.setItem('books', JSON.stringify(newBooks))
      setBooksFiltered(newBooks)
      handleSuccessMessage('Edit')
      handleCloseEditBookModal()
    }

    setBookEdit(emptyBook)
  }

  const handleDeleteBook = (id: number): void => {
    const newBooks = books.filter((book) => book.id !== id)
    setBooks(newBooks)
    localStorage.setItem('books', JSON.stringify(newBooks))
    setBooksFiltered(newBooks)
    setSearchValue('')
  }

  const handleSuccessMessage = (action: 'Create' | 'Delete' | 'Edit'): void => {
    messageApi.open({
      type: 'success',
      content: `${action} success`,
    })
  }

  const handleSearch = (value: string): void => {
    setSearchValue(value)
    let reg = /\[]/gi
    try {
      reg = new RegExp(value, 'gi')
    } catch (error) {
      console.log(error)
    }

    const search = books.filter((book) => book.name.search(reg) > -1)
    setBooksFiltered(search)
  }

  return (
    <ConfigProvider
    // theme={{
    //   algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    // }}
    >
      {contextHolder}
      <Space.Compact
        direction="vertical"
        style={{
          width: '100%',
          // minHeight: 'calc(100vh - 45px)',
          padding: '30px 15px 0 15px',
          // backgroundColor: isDarkMode ? 'rgb(36,37,38)' : 'white',
        }}
      >
        <Space
          style={{
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <Input
            placeholder="Search books"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            addonAfter={<BiSearchAlt2 />}
          />
          <Button
            type="primary"
            danger
            onClick={() => {
              setOpenAddBookModal(true)
            }}
          >
            Add book
          </Button>
        </Space>
        <Table
          dataSource={tableData}
          columns={tableColumns}
          bordered
          pagination={{ defaultPageSize: 4 }}
        />
      </Space.Compact>
      <BookModal
        defaultValues={emptyBook}
        handleOK={handleAddBook}
        handleCloseModal={handleCloseAddBookModal}
        openModal={openAddBookModal}
      />
      <BookModal
        defaultValues={bookEdit}
        handleOK={handleEditBook}
        handleCloseModal={handleCloseEditBookModal}
        openModal={openEditBookModal}
      />
    </ConfigProvider>
  )
}

export default Homepage
