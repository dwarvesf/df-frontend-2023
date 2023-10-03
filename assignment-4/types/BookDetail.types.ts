import { Book } from './app.types'

export interface BookDetailProps {
  book: Book
  handleOpenDeleteModal: (book: Book) => void
}
