import React from "react";

function PageNotFound() {
  return (
    <div className="page-not-found d-flex justify-content-center align-items-center">
      <div className="content">
        <h3 style={{ fontSize: "6rem", display: "inline-block" }}>Oops!</h3>
        <p style={{ fontSize: "5rem", display: "inline-block" }}>404</p>
        <p style={{ fontSize: "2rem" }}>Page Not Found</p>
      </div>
    </div>
  );
}

export default PageNotFound;
