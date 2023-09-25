import { FormInstance } from 'antd';
import { Book } from '../../pages/Homepage/Homepage.types';

export interface AddBookModalProps {
  form: FormInstance<any>;
  openModal: boolean;
  handleAddBook: (value: Book) => void;
  handleCloseModal: () => void;
  topics: String[];
}
