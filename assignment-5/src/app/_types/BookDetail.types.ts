import { Book } from './Homepage.types'

export interface BookDetailProps {
  book: Book
  handleOpenDeleteModal: (book: Book) => void
}
