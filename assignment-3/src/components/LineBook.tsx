import { Dispatch, SetStateAction } from 'react'
import { Book } from "../types"

interface LineBookProps {
  book: Book;
  setModalDelete: Dispatch<SetStateAction<boolean>>,
  setDeleteBook: Dispatch<SetStateAction<Book>>,
}

export default function LineBook({book, setModalDelete, setDeleteBook}:LineBookProps) {

  function handleOpen(e,book){
    e.preventDefault()
    setModalDelete(true)
    setDeleteBook(book)    
  }

  return (    
    <tr key={book.id}>
      <td>{book.name}</td>
      <td>{book.author}</td>
      <td>{book.topic}</td>
      <td className="delete-click" onClick={(e) => handleOpen(e,book)}>Delete</td>
    </tr>    
  )
}