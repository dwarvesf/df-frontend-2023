import { Book } from './app.types'

export interface TableProps {
  books: Book[]
  page: number
  setPage: (page: number) => void
  handleOpenDeleteModal: (book: Book) => void
}
