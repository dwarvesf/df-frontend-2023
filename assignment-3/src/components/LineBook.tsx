// import { Book } from "../types"


// interface LineBookProps {
//   book: Book,
//   setModalDelete: React.Dispatch<React.SetStateAction<boolean>>
//   setDeleteBook: React.Dispatch<React.SetStateAction<Book>>
// }

// export default function LineBook({book,setModalDelete, setDeleteBook }:LineBookProps) {
  
//   function handleOpen(e,book){
//     e.preventDefault()
//     setModalDelete(true)
//     setDeleteBook(book)
//   }
  
//   return (
    
//     <tr key={book.id}>
//       <td>{book.name}</td>
//       <td>{book.author}</td>
//       <td>{book.topic}</td>
//       <td className="delete-click" onClick={(e) => handleOpen(e,book)}>Delete</td>
//     </tr>
    
//   )
// }

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


// import { Book } from "../types"
// interface LineBookProps {
//   book: Book
// }

// const LineBook = ({book}:LineBookProps) => {
//   return (    
//     <tr key={book.id}>
//       <td>{book.name}</td>
//       <td>{book.author}</td>
//       <td>{book.topic}</td>
//       <td className="delete-click" >Delete</td>
//     </tr>
    
//   )
// }

// export default LineBook