import './App.css';
import { useState, useEffect } from 'react';
import {
  ConfigProvider,
  theme,
  Button,
  Table,
  Space,
  Select,
  Form,
  message,
  Popconfirm,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Header from './components/Header/Header';
import { Book, TableDataType } from './App.types';
import AddBookModal from './components/AddBookModal/AddBookModal';

function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [booksFiltered, setBooksFiltered] = useState<
    { label: string; value: string }[]
  >([]);
  const [openModal, setOpenModal] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setBooks([
      {
        name: 'Refactoring',
        author: 'Martin Fowler',
        topic: 'Programming',
      },
      {
        name: 'Designing Data-Intensive Applications',
        author: 'Martin Kleppmann',
        topic: 'Database',
      },
      {
        name: 'The Phoenix Project',
        author: 'Gene Kim',
        topic: 'DevOps',
      },
      {
        name: 'A song of ice and fire',
        author: 'George R. R. Martin',
        topic: 'Fantasy',
      },
      {
        name: 'Lord of the Rings',
        author: 'J. R. R. Tolkien',
        topic: 'Fantasy',
      },
      {
        name: 'Sherlock Holmes',
        author: 'Arthur Conan Doyle',
        topic: 'Detective',
      },
      {
        name: 'Romance of the Three Kingdoms',
        author: 'Luo Guanzhong',
        topic: 'History',
      },
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const topics: string[] = [
    'Programming',
    'Database',
    'DevOps',
    'Fantasy',
    'Detective',
    'History',
  ];

  const tableColumns: ColumnsType<TableDataType> = [
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
          onConfirm={() => handleDeleteBook(record.name)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="text" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const tableData: TableDataType[] = books.map((book, i) => {
    return {
      key: i,
      name: book.name,
      author: book.author,
      topic: book.topic,
      action: 'Delete',
    };
  });

  const handleSwitchTheme = (): void => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  const handleCloseModal = (): void => {
    setOpenModal(false);
  };

  const handleAddBook = (newBook: Book): void => {
    if (newBook.name && newBook.author) {
      setBooks((oldBooks) => [...oldBooks, newBook]);
      handleSuccessMessage('Create');
      handleCloseModal();
    }
  };

  const handleDeleteBook = (name: string): void => {
    setBooks((oldBooks) => oldBooks.filter((book) => book.name !== name));
  };

  const handleSuccessMessage = (action: 'Create' | 'Delete'): void => {
    messageApi.open({
      type: 'success',
      content: `${action} success`,
    });
  };

  const handleSearch = (): void => {
    const reg = new RegExp(searchValue, 'gi');

    const search = books.filter((book) => book.name.search(reg) > -1);
    setBooksFiltered(
      search.map((item) => {
        return { label: item.name, value: item.name };
      }),
    );
  };

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
          <Select
            showSearch
            onChange={(value) => setSearchValue(value)}
            labelInValue
            options={booksFiltered}
            notFoundContent="No book match the search value"
            onSearch={handleSearch}
            placeholder="Search books"
            style={{ minWidth: '200px' }}
          />
          <Button
            type="primary"
            danger
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Add book
          </Button>
        </Space>
        <Table dataSource={tableData} columns={tableColumns} bordered />
      </Space.Compact>
      <AddBookModal
        form={form}
        handleAddBook={handleAddBook}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
        topics={topics}
      />
    </ConfigProvider>
  );
}

export default App;
