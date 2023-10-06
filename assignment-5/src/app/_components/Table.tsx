import { Table, Space, Popconfirm, Button } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TableDataType, MyTableProps } from '../_types/Table.types'
import { emptyBook } from '../_utils/constants'

const MyTable = ({
  handleDeleteBook,
  books,
  setBookEdit,
  setOpenEditBookModal,
  booksFiltered,
}: MyTableProps) => {
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

  const tableData: TableDataType[] = booksFiltered.map(
    ({ id, name, author, topic }) => {
      return {
        key: id,
        '#': id,
        name,
        author,
        topic,
        action: '',
      }
    },
  )

  return (
    <Table
      dataSource={tableData}
      columns={tableColumns}
      bordered
      pagination={{ defaultPageSize: 4 }}
    />
  )
}

export default MyTable
