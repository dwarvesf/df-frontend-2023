import { Book } from './Homepage.types'

export interface BookModalProps {
  openModal: boolean
  defaultValues: Book
  handleOK: (value: Book) => void
  handleCloseModal: () => void
}
