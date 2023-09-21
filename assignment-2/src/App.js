import "./App.css";
import { useState, useEffect } from "react";
import {
  ConfigProvider,
  theme,
  Button,
  Table,
  Typography,
  Space,
  Switch,
  Avatar,
  Input,
  Modal,
  Select,
  Form,
  message,
  Popconfirm,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [booksFiltered, setBooksFiltered] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks([
      {
        name: "Refactoring",
        author: "Martin Fowler",
        topic: "Programming",
      },
      {
        name: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        topic: "Database",
      },
      {
        name: "The Phoenix Project",
        author: "Gene Kim",
        topic: "DevOps",
      },
      {
        name: "A song of ice and fire",
        author: "George R. R. Martin",
        topic: "Fantasy",
      },
      {
        name: "Lord of the Rings",
        author: "J. R. R. Tolkien",
        topic: "Fantasy",
      },
      {
        name: "Sherlock Holmes",
        author: "Arthur Conan Doyle",
        topic: "Detective",
      },
      {
        name: "Romance of the Three Kingdoms",
        author: "Luo Guanzhong",
        topic: "History",
      },
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
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
          onConfirm={() => handleDeleteBook(record.name)}
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

  const tableData = books.map((book, i) => {
    return {
      key: i,
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
    setBooks((oldBooks) => [...oldBooks, newBook]);
  };

  const handleDeleteBook = (name) => {
    setBooks((oldBooks) => oldBooks.filter((book) => book.name !== name));
  };

  const handleSuccessMessage = (action) => {
    const content =
      action === "create" ? "Create" : action === "delete" ? "Delete" : "";
    messageApi.open({
      type: "success",
      content: `${content} success`,
    });
  };

  const handleSearch = () => {
    const reg = new RegExp(searchValue, "gi");

    const search = books.filter((book) => book.name.search(reg) > -1);
    setBooksFiltered(
      search.map((item) => {
        return { label: item.name, value: item.name };
      })
    );
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      {contextHolder}
      <Space
        style={{
          width: "100%",
          padding: "6px 12px",
          justifyContent: "space-between",
          borderBottom: `1px solid ${
            isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"
          }`,
          backgroundColor: isDarkMode ? "rgb(36,37,38)" : "white",
        }}
      >
        <Space>
          <Title
            style={{
              fontSize: "18px",
              fontWeight: 700,
              margin: 0,
            }}
          >
            Bookstore
          </Title>
        </Space>
        <Space>
          <Switch checked={isDarkMode} onChange={handleSwitchTheme} />
          <Text
            style={{ fontSize: "14px", fontWeight: 500, marginRight: "7px" }}
          >
            {isDarkMode ? "Dark" : "Light"} mode
          </Text>
          <Avatar icon={<UserOutlined />} />
          <Text style={{ fontSize: "14px", fontWeight: 500 }}>
            Tien Anh Luu
          </Text>
        </Space>
      </Space>
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
          <Select
            showSearch
            onChange={(value) => setSearchValue(value)}
            labelInValue
            options={booksFiltered}
            notFoundContent='No book match the search value'
            onSearch={handleSearch}
            placeholder='Search books'
            style={{ minWidth: "200px" }}
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
        <Table dataSource={tableData} columns={tableColumns} bordered />
      </Space.Compact>
      <Modal
        title='Add book'
        open={openModal}
        okText='Create'
        cancelText='Cancel'
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleAddBook(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
          handleSuccessMessage("create");
          handleCloseModal();
        }}
        onCancel={handleCloseModal}
      >
        <Form
          form={form}
          layout='vertical'
          name='add-book-form'
          initialValues={{ topic: "Programming" }}
        >
          <Form.Item
            name='name'
            label='Name'
            rules={[
              { required: true, message: "Please input the name of book!" },
            ]}
          >
            <Input placeholder='Book name' />
          </Form.Item>
          <Form.Item
            name='author'
            label='Author'
            rules={[
              { required: true, message: "Please input the author of book!" },
            ]}
          >
            <Input placeholder='Book author' />
          </Form.Item>
          <Form.Item name='topic' label='Topic'>
            <Select
              options={topics.map((topic) => {
                return { value: topic, label: topic };
              })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}

export default App;
