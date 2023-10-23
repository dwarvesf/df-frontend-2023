import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ReactPortal from "../ReactPortal";

function InputAddTopicModal({
  submitLabelContent = "Add",
  cancelLabelContent = "Cancel",
  isOpen,
  handleClose,
  handleAddTopicSubmit,
}) {
  const [values, setValues] = useState({
    name: "",
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
    const topicData = { name: values.name };
    handleAddTopicSubmit(e, topicData);
  }

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
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn" type="submit">
                {submitLabelContent}
              </button>
              <button onClick={handleClose} className="btn btn-cancel">
                {cancelLabelContent}
              </button>
            </div>
          </form>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}

export default InputAddTopicModal;
