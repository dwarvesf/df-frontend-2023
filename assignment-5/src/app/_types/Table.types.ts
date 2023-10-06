import { Book } from './Homepage.types'

export interface TableDataType {
  key: React.Key
  '#': number
  name: string
  author: string
  topic: string
  action: string
}

export interface MyTableProps {
  handleDeleteBook: (id: number) => void
  books: Book[]
  setBookEdit: (book: Book) => void
  setOpenEditBookModal: (value: boolean) => void
  booksFiltered: Book[]
}
