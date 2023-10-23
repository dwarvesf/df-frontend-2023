import './modal-style.css'

interface Book {
  name: string;
  author: string;
  topic: string;
}

interface DeleteModalProps {
  close: () => void;
  item: Book;
  delBook: (book: Book) => void;
}
const DeleteModal = ({ close, item, delBook }: DeleteModalProps) => {
  return (
    <div id="delete-modal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <button className="closeBtn" onClick={close}>
            &times;
          </button>
          <h2>Delete book</h2>
        </div>
        <br />

        <div className="modal-body">
          <p>
            Do you want to delete <b>{item.name}</b> book?
          </p>
          <button
            type="button"
            className="deleteBookBtn"
            onClick={() => delBook(item)}
          >
            Delete
          </button>
          <button type="button" className="cancelDeletionBtn" onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
