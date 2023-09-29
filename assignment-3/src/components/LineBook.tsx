import { Book } from "../types"

interface LineBookProps {
  book: Book;
}

export default function LineBook({book}:LineBookProps) {
  return (    
    <tr key={book.id}>
      <td>{book.name}</td>
      <td>{book.author}</td>
      <td>{book.topic}</td>
      <td className="delete-click" >Delete</td>
    </tr>    
  )
}