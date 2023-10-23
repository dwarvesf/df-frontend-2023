import { useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

//! create element inside
function createWrappedBody(wrapperId) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

//! children: renderedComponent, wrapperId: id of portal-root
function ReactPortal({ children, wrapperId = "portal-wrapped-root" }) {
  //! state used to update modal and re-render modal
  const [wrapperElement, setWrapperElement] = useState(null);

  useLayoutEffect(() => {
    let wrapperElement = document.getElementById(wrapperId);
    let systemCreated = false;

    //! check existing Element have wrapperId
    if (!wrapperElement) {
      //! create wrapperId element that inside body
      systemCreated = true;
      wrapperElement = createWrappedBody(wrapperId);
    }
    setWrapperElement(wrapperElement);

    return () => {
      if (systemCreated && wrapperElement.parentNode) {
        wrapperElement.parentNode.removeChild(wrapperElement);
      }
    };
  }, [wrapperId]);

  // wrapperElement state will be null on very first render.
  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

export default ReactPortal;
