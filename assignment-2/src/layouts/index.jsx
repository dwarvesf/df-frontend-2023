//! Components
import Footer from "./Footer";
import Header from "./Header";
import { useOutlet } from "react-router-dom";
import { Fragment } from "react";

import React from "react";

const Root = () => {
  const outlet = useOutlet();

  return (
    <Fragment>
      <Header />
      <main className="container--body">{outlet}</main>
      <Footer />
    </Fragment>
  );
};

export default Root;
