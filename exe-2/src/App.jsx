import { useState, useEffect } from "react";
import axios from 'axios';
import Books from "./components/Books";
import Pagination from "./components/Pagination";

function App() {
  const [books, setBooks] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('./db/data.json')
        setBooks(result.data);
      } catch (error) {
        console.log("error ->", error)
      }

    }
    fetchData();
  }, [])
  console.log("books =>", books)
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  console.log("currentBooks =>", currentBooks)
  // console.log(Array.isArray(currentBooks));

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container">
      {/* Navbar */}
      <nav>
        <div className="title">Bookstore</div>
        <div className="username"><img src="./assets/user.png" />TN</div>
      </nav>
      {/* Search bar */}
      <div className="searchbar">
        <input type="text" />
        <button type="button" className="btn btn--primary" id="openAddedForm">Add book</button>
      </div>
      {/* addedForm */}
      <form id="addedForm">
        <div className="form__title">
          <h2>Add book</h2>
          <button type="button" className="closedBox">X</button>
        </div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="bookName" />
        <label htmlFor="author">Author</label>
        <input type="text" name="author" id="bookAuthor" />
        <label htmlFor="topic">Topic</label>
        <select name="topic" id="bookTopic">
          <option value="Programming">Programming</option>
          <option value="Database">Database</option>
          <option value="DevOps">DevOps</option>
        </select>
        <button type="button" id="createdBTN">Create</button>
      </form>
      {/* deletedForm */}
      <form id="deletedForm">
        <div className="form__title">
          <h2>Delete book</h2>
          <button type="button" className="closedBox">X</button>
        </div>
        <p>Do you want to delete <strong>this</strong> book?</p>
        <button type="button" id="deletedBookBTN">Delete</button>
        <button type="button" id="cancelDeletedBookBTN">Cancel</button>
      </form>
      {/* Table */}
      {/* <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Topic</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table> */}
      <Books books={currentBooks} />

      <Pagination booksPerPage={booksPerPage} totalBooks={books.length} paginate={paginate} />
    </div >
  )
}

export default App
