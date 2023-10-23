const DeleteModal = ({ close, item, delBook }) => {
  return (
    <div id="delete-modal" className="modal">
      <div className="modal-content">
        <div class="modal-header">
          <button class="closeBtn" onClick={close}>
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
