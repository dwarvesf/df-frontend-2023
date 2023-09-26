import React, { useEffect, useState } from "react";
//! imp Components
import DeleteIcon from "../../components/Icons/DeleteIcon";
import Table from "../../components/Table";
import { ConfirmationModal, InputAddBookModal } from "../../components/Modal";
import Pagination from "../../components/Pagination";
//! store
import { useStore } from "../../store";

function Home() {
  const [selectedId, setSelectedId] = React.useState(null);
  const [showModalConfirmation, setShowModalConfirmation] = useState(false);
  const [showModalInputAddBook, setShowModalInputAddBook] = useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const PER_PAGE = 5;

  const [modalConfirmation, setModalConfirmation] = React.useState({
    content: "",
  });

  const { state, contextActions } = useStore();
  const { book, topic } = contextActions;

  const [values, setValues] = useState({
    search: "",
  });

  console.log("state: ", state);

  //! fetch data once
  useEffect(() => {
    topic.fetchAll();
  }, []);

  React.useEffect(() => {
    book.fetchBooksByFilter(currentPage, PER_PAGE, { search: values.search });
  }, [currentPage, values.search, PER_PAGE, state.bookCounts]);

  const handleChange = (e) => {
    book.fetchBooksByFilter(currentPage, PER_PAGE, { search: values.search });

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
    console.log("book.id: ", book.id);
  }

  function handleDeleteBookSubmit() {
    book.findIdAndDelete(selectedId);

    // const data = models.Book.fetchBooks();

    // setBookDatas(data);
    setShowModalConfirmation(false);
  }

  function handleClickCancel(e) {
    e.preventDefault();
    setShowModalConfirmation(false);
    setShowModalInputAddBook(false);
    setSelectedId(null);
  }

  function handleAddBookSubmit(e, data) {
    book.create(data);
  }

  const tableHeaders = ["", "Name", "Author", "Topic", "Action"];
  const tableDetails = state.books?.map((book, index) => {
    return {
      idx: index + 1,
      name: book.name,
      author: book.author,
      topic: book.topic,
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
    <div className="">
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
      <div className="">
        {state.books && (
          <Table tableHeaders={tableHeaders} tableDetails={tableDetails} />
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            currentPage={currentPage}
            itemsCount={state.bookCounts}
            itemsPerPage={PER_PAGE}
            setCurrentPage={setCurrentPage}
            alwaysShown={true}
          />
        </div>
      </div>
      <ConfirmationModal
        submitLabelContent="Delete"
        isOpen={showModalConfirmation}
        handleSubmit={handleDeleteBookSubmit}
        handleClose={handleClickCancel}
      >
        {modalConfirmation.content}
      </ConfirmationModal>
      <InputAddBookModal
        topics={state.topics}
        submitLabelContent="Add"
        isOpen={showModalInputAddBook}
        handleAddBookSubmit={handleAddBookSubmit}
        handleClose={handleClickCancel}
      />
    </div>
  );
}

export default Home;
