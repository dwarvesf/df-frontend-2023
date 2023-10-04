import { FormInstance } from 'antd'
import { Book } from './Homepage.types'

export interface BookModalProps {
  form: FormInstance<Book>
  openModal: boolean
  defaultValues: Book
  handleOK: (value: Book) => void
  handleCloseModal: () => void
}
