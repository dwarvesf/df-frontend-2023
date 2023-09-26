import React, { useEffect, useState } from "react";
import { models } from "../../database";
//! imp Components
import DeleteIcon from "../../components/Icons/DeleteIcon";
import Table from "../../components/Table";
import { ConfirmationModal, InputAddBookModal } from "../../components/Modal";

function Home() {
  const [selectedId, setSelectedId] = React.useState(null);
  const [showModalConfirmation, setShowModalConfirmation] = useState(false);
  const [showModalInputAddBook, setShowModalInputAddBook] = useState(false);

  const [modalConfirmation, setModalConfirmation] = React.useState({
    content: "",
  });

  const HomeCountRef = React.useRef(0);
  console.log(
    "%c__Debugger__Home::re-render",
    "color: yellow;",
    (HomeCountRef.current += 1)
  );
  const [bookDatas, setBookDatas] = useState([]);
  const [values, setValues] = useState({
    search: "",
  });

  //! fetch data once
  useEffect(() => {
    async function fetchDataFromStorage() {
      const data = models.Book.fetchBooks();
      setBookDatas(data);
    }

    fetchDataFromStorage();
  }, []);

  const handleChange = (e) => {
    console.log(
      "__Debugger__index\n:::nmodule :::e.target: ",
      e.target.value,
      "\n"
    );

    //! debound
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  function handleClickAdd(e) {
    e.preventDefault();
    setShowModalInputAddBook(true);
  }

  function handleClickConfirmDelete(e, book) {
    e.stopPropagation();
    setModalConfirmation({
      content: `Do you want to delete ${book.name} book.`,
    });
    setShowModalConfirmation(true);
    setSelectedId(book.id);
  }

  function handleDeleteBookSubmit() {
    models.Book.findOneAndRemove(selectedId);

    const data = models.Book.fetchBooks();

    setBookDatas(data);
    setShowModalConfirmation(false);
  }

  function handleClickCancel() {
    setShowModalConfirmation(false);
    setSelectedId(null);
  }

  const tableHeaders = ["", "Name", "Author", "Topic", "Action"];
  const tableDetails = bookDatas?.map((book, index) => {
    return {
      ...book,
      action: (
        <button
          className="btn btn-delete"
          onClick={(e) => handleClickConfirmDelete(e, book)}
        >
          <DeleteIcon color="#000000" />
        </button>
      ),
    };
  });

  return (
    <div className="container--fluid container-app">
      <form>
        <div className="container__row inspiration-form-control-group">
          <div className="container__col-12 container__col-sm-9 inspiration-form-control form-control-search">
            <input
              type="text"
              id="ipt-search"
              name="search"
              aria-labelledby="search"
              value={values.search}
              onChange={handleChange}
            />
            <label className="label" htmlFor="ipt-search" id="label-search">
              <div className="text">Search</div>
            </label>
          </div>
          <button
            className="container__col-sm-offset-1 container__col-sm-2 btn btn-add"
            type="submit"
            onClick={handleClickAdd}
          >
            Add
          </button>
        </div>
      </form>
      <Table tableHeaders={tableHeaders} tableDetails={tableDetails} />
      <ConfirmationModal
        submitLabelContent="Delete"
        isOpen={showModalConfirmation}
        handleSubmit={handleDeleteBookSubmit}
        handleClose={handleClickCancel}
      >
        {modalConfirmation.content}
      </ConfirmationModal>
      <InputAddBookModal
        submitLabelContent="Add"
        isOpen={showModalInputAddBook}
        handleSubmit={handleDeleteBookSubmit}
        handleClose={handleClickCancel}
      />
    </div>
  );
}

export default Home;
