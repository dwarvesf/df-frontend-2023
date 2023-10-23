import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ReactPortal from "../ReactPortal";

function InputAddBookModal({
  topics,
  submitLabelContent = "Add",
  cancelLabelContent = "Cancel",
  isOpen,
  handleClose,
  handleAddBookSubmit,
}) {
  const [values, setValues] = useState({
    name: "",
    author: "",
    topic: "",
  });
  const nodeRef = useRef(null);
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const bookData = {
      name: values.name,
      author: values.author,
      topic: values.topic,
    };
    handleAddBookSubmit(e, bookData);
  }

  const renderOptions = topics.map((opt) => {
    return <option key={opt.id}>{opt.name}</option>;
  });

  return (
    <ReactPortal wrapperId="modal-root">
      <CSSTransition
        in={isOpen}
        timeout={{ entry: 0, exit: 300 }}
        unmountOnExit
        classNames="modal"
        nodeRef={nodeRef}
      >
        <div className="modal" ref={nodeRef}>
          <form className="modal-wrapped" onSubmit={handleSubmit}>
            <div className="modal-header">Delete Book</div>
            <div className="modal-body">
              <div className="modal-content">
                <div className="form-control-group">
                  <label className="label-form-control" htmlFor="name">
                    name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Enter book's name..."
                    value={values.name}
                    onChange={handleChange}
                  />
                  <span className="focus-form-control"></span>
                </div>
                <div className="form-control-group">
                  <label className="label-form-control" htmlFor="author">
                    author
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="author"
                    placeholder="Enter book's author..."
                    value={values.author}
                    onChange={handleChange}
                  />
                  <span className="focus-form-control"></span>
                </div>
                <div className="form-control-group">
                  <label className="label-form-control" htmlFor="topic">
                    author
                  </label>
                  <select
                    className="form-control"
                    type=""
                    name="topic"
                    placeholder="Enter book's author..."
                    value={values.topic}
                    onChange={handleChange}
                  >
                    <option value="">{`Choose topic...`}</option>
                    {renderOptions}
                  </select>

                  <span className="focus-form-control"></span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                id="modal__btn-delete"
                className="btn btn-delete"
                onClick={handleSubmit}
              >
                {submitLabelContent}
              </button>
              <button
                id="modal__btn-cancel"
                onClick={handleClose}
                className="btn btn-cancel"
              >
                {cancelLabelContent}
              </button>
            </div>
          </form>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}

export default InputAddBookModal;
