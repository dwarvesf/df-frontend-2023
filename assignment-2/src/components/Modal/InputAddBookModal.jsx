import { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ReactPortal from "../ReactPortal";
//! Components
import InputFormControl from "../../components/Form/InputFormControl";

function InputAddBookModal({
  submitLabelContent = "Add",
  cancelLabelContent = "Cancel",
  isOpen,
  handleClose,
  handleSubmit,
}) {
  const nodeRef = useRef(null);
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

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
          <div className="modal-wrapped">
            <div className="modal-header">Delete Book</div>
            <div className="modal-body">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="form-control-group">
                    <label
                      className="label-form-control"
                      htmlFor="modal__ipt-name"
                    >
                      name
                    </label>
                    <input
                      id="modal__ipt-name"
                      className="form-control"
                      type="text"
                      name="modal__ipt-name"
                      placeholder="Enter book's name..."
                    />
                    <span className="focus-form-control"></span>
                  </div>
                  <div className="form-control-group">
                    <label
                      className="label-form-control"
                      htmlFor="modal__ipt-author"
                    >
                      author
                    </label>
                    <input
                      id="modal__ipt-author"
                      className="form-control"
                      type="text"
                      name="modal__ipt-author"
                      placeholder="Enter book's author..."
                    />
                    <span className="focus-form-control"></span>
                  </div>
                  <InputFormControl labelName="Topic" />
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
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}

export default InputAddBookModal;
