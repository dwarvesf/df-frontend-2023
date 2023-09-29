import { Dispatch, SetStateAction } from 'react'
import { Book } from '../types'

interface ModalDeleteProps{
  book: Book,
  openModalDelete: boolean,
  setModalDelete: Dispatch<SetStateAction<boolean>>,
  handleDelete: (item: Book)=>void,
}


export default function ModalDelete({ book, openModalDelete, setModalDelete, handleDelete }: ModalDeleteProps) {
    function closeModal() {
      setModalDelete(false)
    }  
    
    function clickDelete(e,handleDelete: Function,setModalDelete:Dispatch<SetStateAction<boolean>>,book: Book){
        e.preventDefault()
        handleDelete(book)
        setModalDelete(false)
    }
    
    return openModalDelete ? (
      <div className="modal modal-delete">
        <div className="form delete-form">
          <h2 className="form-header">
            Delete book
            <button className="close" type="button" onClick={closeModal}>
              &#x2716;
            </button>
          </h2>
          <div className="form__content delete-item">Do you want to delete {book.name} book?</div>
          <div className="form__btn">
            <button className="btn-delete" onClickCapture={(e) => clickDelete(e,handleDelete,setModalDelete,book)}>Delete</button>
            <button className="btn btn-cancel" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    ) : null
      
    
  }