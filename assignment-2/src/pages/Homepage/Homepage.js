import { useState, useEffect } from "react";
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
} from "antd";
import Header from "../../components/Header";
import AddBookModal from "../../components/AddBookModal";

const Homepage = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [isDarkMode, setIsDarkMode] = useState(false);

  // value of the search input field
  const [searchValue, setSearchValue] = useState("");

  // for search purpose
  const [booksFiltered, setBooksFiltered] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let dat = [];
    try {
      const items = localStorage.getItem("books");
      if (items) {
        dat = JSON.parse(items);
      }
    } catch (error) {
      console.log(error);
    }

    const defaultData = [
      {
        id: 1,
        name: "Refactoring",
        author: "Martin Fowler",
        topic: "Programming",
      },
      {
        id: 2,
        name: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        topic: "Database",
      },
      {
        id: 3,
        name: "The Phoenix Project",
        author: "Gene Kim",
        topic: "DevOps",
      },
      {
        id: 4,
        name: "A song of ice and fire",
        author: "George R. R. Martin",
        topic: "Fantasy",
      },
      {
        id: 5,
        name: "Lord of the Rings",
        author: "J. R. R. Tolkien",
        topic: "Fantasy",
      },
      {
        id: 6,
        name: "Sherlock Holmes",
        author: "Arthur Conan Doyle",
        topic: "Detective",
      },
      {
        id: 7,
        name: "Romance of the Three Kingdoms",
        author: "Luo Guanzhong",
        topic: "History",
      },
    ];

    if (dat.length === 0) {
      setBooks(defaultData);
      setBooksFiltered(defaultData);
    } else {
      setBooks(dat);
      setBooksFiltered(dat);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
    setBooksFiltered(books);
  }, [books]);

  const topics = [
    "Programming",
    "Database",
    "DevOps",
    "Fantasy",
    "Detective",
    "History",
  ];

  const tableColumns = [
    {
      title: "#",
      dataIndex: "#",
      key: "#",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title='Delete book'
          description='Are you sure to delete this book?'
          onConfirm={() => handleDeleteBook(record["#"])}
          okText='Yes'
          cancelText='No'
        >
          <Button type='text' danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const tableData = booksFiltered.map((book) => {
    return {
      key: book.id,
      "#": book.id,
      name: book.name,
      author: book.author,
      topic: book.topic,
      action: "Delete",
    };
  });

  const handleSwitchTheme = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddBook = (newBook) => {
    if (newBook.name && newBook.author) {
      setSearchValue("");
      setBooks((oldBooks) => [...oldBooks, newBook]);
      handleSuccessMessage("Create");
      handleCloseModal();
    }
  };

  const handleDeleteBook = (id) => {
    setBooks((oldBooks) => oldBooks.filter((book) => book.id !== id));
    setSearchValue("");
  };

  const handleSuccessMessage = (action) => {
    messageApi.open({
      type: "success",
      content: `${action} success`,
    });
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    let reg = /\[]/gi;
    try {
      reg = new RegExp(value, "gi");
    } catch (error) {
      console.log(error);
    }

    const search = books.filter((book) => book.name.search(reg) > -1);
    setBooksFiltered(search);
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
        direction='vertical'
        style={{
          width: "100%",
          minHeight: "calc(100vh - 45px)",
          padding: "30px 15px 0 15px",
          backgroundColor: isDarkMode ? "rgb(36,37,38)" : "white",
        }}
      >
        <Space
          style={{
            width: "100%",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Input
            placeholder='Search books'
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            addonAfter={<i className='fa-solid fa-magnifying-glass'></i>}
          />
          <Button
            type='primary'
            danger
            onClick={() => {
              setOpenModal(true);
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
        topics={topics}
      />
    </ConfigProvider>
  );
};

export default Homepage;
