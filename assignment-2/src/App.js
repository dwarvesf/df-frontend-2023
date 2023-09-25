import "./App.css";
import { useState, useEffect } from "react";
import CreateModal from "./content/modal/create";
import DeleteModal from "./content/modal/delete";

let action, selectedItem;
const dataKey = "books";
const maxRecord = 5;

function App() {
  // set State
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const bookList = JSON.parse(localStorage.getItem(dataKey) || "[]");
    setData(bookList);
  }, []);

  useEffect(() => {
    numberOfPages();
  }, [data, searchItem]);

  function updateList(data) {
    localStorage.setItem(dataKey, JSON.stringify(data));
    setData(data);
    setPage(0);
  }

  // Handle Modal
  function openModal(selectedAction, item) {
    selectedItem = item;
    action = selectedAction;
    setModalOpen(true);
  }

  function closeModal() {
    action = null;
    setModalOpen(false);
  }

  function displayModal() {
    // Add Modal
    if (action === "Create") {
      return <CreateModal close={closeModal} addBook={addItem} />;
    }
    // Delete Modal
    if (action === "Delete") {
      return (
        <DeleteModal
          close={closeModal}
          item={selectedItem}
          delBook={deleteItem}
        />
      );
    }
    return null;
  }

  // Handle Add, Delete Item

  function addItem(newItem) {
    const newList = data.concat([newItem]);
    updateList(newList);
    setModalOpen(false);
  }

  function deleteItem(item) {
    const index = data.findIndex((i) => i.name === item.name);
    if (index === -1) {
      return;
    }
    const newList = [...data];
    newList.splice(index, 1);
    updateList(newList);
    setModalOpen(false);
  }

  function numberOfPages() {
    let pattern = new RegExp(searchItem.toLowerCase(), "g");
    let filterTitle = data.filter((i) => pattern.test(i.name.toLowerCase()));
    let totalPageCount = Math.ceil(filterTitle.length / maxRecord);
    setTotal(totalPageCount);
  }

  function displayItem() {
    let pattern = new RegExp(searchItem.toLowerCase(), "g");
    let filterTitle = data.filter((i) => pattern.test(i.name.toLowerCase()));

    const dataPage = filterTitle.slice(
      page * maxRecord,
      (page + 1) * maxRecord
    );
    
    return dataPage.map((i) => {
      return (
        <tr key={i.name}>
          <td className="table-title name">{i.name}</td>
          <td className="table-title author">{i.author}</td>
          <td className="table-title topic">{i.topic}</td>
          <td>
            <button
              className="table-button"
              type="button"
              onClick={() => openModal("Delete", i)}
            >
              <span>Delete</span>
            </button>
          </td>
        </tr>
      );
    });
  }

  const paginationBtn = Array.from({ length: total }, (_, i) => (
    // Return a button element.
    <button
      type="button"
      className={"table-page" + (i === page ? " active" : "")}
      onClick={() => setPage(i)}
      key={i}
    >
      {i + 1}
    </button>
  ));

  return (
    <div>
      <nav className="head">
        <div className="head-title">
          <h1>Bookstore</h1>
        </div>
        <div className="head-profile">
          {/* <img alt="logo" src="/public/df-logo.png"/> */}
          <a href="https://github.com/iTeddy1">
            <h2>iTeddy1</h2>
          </a>
        </div>
      </nav>
      <main>
        <div className="search">
          <input
            type="text"
            className="search-input"
            placeholder="Search books..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
          <button
            id="btnAddBook"
            type="button"
            onClick={() => openModal("Create")}
          >
            Add Book
          </button>
        </div>

        <div className="table">
          <table>
            <thead>
              <tr>
                <th className="table-title name">Name</th>
                <th className="table-title author">Author</th>
                <th className="table-title topic">Topic</th>
                <th className="table-title action">Action</th>
              </tr>
            </thead>
            <tbody>{displayItem()}</tbody>
          </table>
          <div className="pagination">{paginationBtn}</div>
        </div>
      </main>

      {modalOpen ? displayModal() : null}

      <footer>
        Made by{" "}
        <span>
          <a href="https://github.com/iTeddy1">@Teddy</a>
        </span>{" "}
        and
        <span>
          <a href="https://github.com/dwarvesf">@Dwarves</a>
        </span>
      </footer>
    </div>
  );
}

export default App;
