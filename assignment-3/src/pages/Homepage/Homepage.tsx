import { useState, useEffect } from 'react'
import {
  ConfigProvider,
  theme,
  Button,
  Table,
  Space,
  Input,
  Form,
  message,
  Popconfirm,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Header from '../../components/Header/Header'
import AddBookModal from '../../components/AddBookModal/AddBookModal'
import { defaultBooks } from '../../utils/constant'
import { getData } from '../../utils/data'
import { Book, TableDataType } from './Homepage.types'

const Homepage = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  const [isDarkMode, setIsDarkMode] = useState(false)

  // value of the search input field
  const [searchValue, setSearchValue] = useState('')

  // for search purpose
  const [booksFiltered, setBooksFiltered] = useState<Book[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    const dat = getData()

    if (dat.length === 0) {
      setBooks(defaultBooks)
      setBooksFiltered(defaultBooks)
      localStorage.setItem('books', JSON.stringify(defaultBooks))
    } else {
      setBooks(dat)
      setBooksFiltered(dat)
    }
  }, [])

  // useEffect(() => {
  //   localStorage.setItem('books', JSON.stringify(books))
  //   setBooksFiltered(books)
  // }, [books])

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
      action: 'Delete',
    }
  })

  const handleSwitchTheme = (): void => {
    setIsDarkMode((previousValue) => !previousValue)
  }

  const handleCloseModal = (): void => {
    setOpenModal(false)
  }

  const handleAddBook = (newBook: Book): void => {
    if (newBook.name && newBook.author && newBook.topic) {
      const newBooks = [...books, newBook]
      setSearchValue('')
      setBooks(newBooks)
      localStorage.setItem('books', JSON.stringify(newBooks))
      setBooksFiltered(newBooks)
      handleSuccessMessage('Create')
      handleCloseModal()
    }
  }

  const handleDeleteBook = (id: number): void => {
    const newBooks = books.filter((book) => book.id !== id)
    setBooks(newBooks)
    localStorage.setItem('books', JSON.stringify(newBooks))
    setBooksFiltered(newBooks)
    setSearchValue('')
  }

  const handleSuccessMessage = (action: 'Create' | 'Delete'): void => {
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
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      {contextHolder}
      <Header isDarkMode={isDarkMode} handleSwitchTheme={handleSwitchTheme} />
      <Space.Compact
        direction="vertical"
        style={{
          width: '100%',
          minHeight: 'calc(100vh - 45px)',
          padding: '30px 15px 0 15px',
          backgroundColor: isDarkMode ? 'rgb(36,37,38)' : 'white',
        }}
      >
        <Space
          style={{
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          {/* <Select
            showSearch
            onChange={(value) => setSearchValue(value)}
            value={searchValue}
            labelInValue
            options={booksFiltered.map((book) => {
              return { label: book.name, value: book.id }
            })}
            notFoundContent="No book match the search value"
            onSearch={(value) => handleSearch(value)}
            placeholder="Search books"
            style={{ minWidth: '200px' }}
          /> */}
          <Input
            placeholder="Search books"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            addonAfter={<i className="fa-solid fa-magnifying-glass" />}
          />
          <Button
            type="primary"
            danger
            onClick={() => {
              setOpenModal(true)
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
      <AddBookModal
        form={form}
        handleAddBook={handleAddBook}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
      />
    </ConfigProvider>
  )
}

export default Homepage
