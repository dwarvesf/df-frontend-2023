import { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ReactPortal from "../ReactPortal";

function ConfirmationModal({
  submitLabelContent = "OK",
  cancelLabelContent = "Cancel",
  children,
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
              <div className="modal-content">{children}</div>
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

export default ConfirmationModal;
