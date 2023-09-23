import React from "react";

function Home() {
  return (
    <div className="container--fluid container-app">
      <form action="">
        <div className="container__row inspiration-form-control-group">
          <div className="container__col-12 container__col-sm-8 inspiration-form-control form-control-search">
            <input
              type="text"
              id="ipt-search"
              value=""
              name="ipt-search"
              aria-labelledby="ipt-search"
            />
            <label className="label" htmlFor="ipt-search" id="label-search">
              <div className="text">Search</div>
            </label>
          </div>
          <button
            id="btn-add-book"
            className="container__col-sm-offset-2 container__col-sm-2 btn btn-add"
            type="button"
          >
            Add Book
          </button>
        </div>
      </form>

      <table className="styled-table">
        <thead>
          <tr className="">
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Author</th>
            <th scope="col">Topic</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody id="tbody"></tbody>
      </table>
    </div>
  );
}

export default Home;
