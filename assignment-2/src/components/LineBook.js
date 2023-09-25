
export default function LineBook({ book,setModalDelete, setDeleteBook }) {
  
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
