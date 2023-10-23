// Your JS code goes here
const modalAdd = document.querySelector("#box-modal-add");
const modalDelete = document.querySelector("#box-modal-confirm");

const defaultBooks = [
  {
    name: "O Alquimista",
    author: "Paulo Coelho",
    topic: "Novel",
  },
  {
    name: "Life of Pi",
    author: "Yann Martel",
    topic: "Novel",
  },
  {
    name: "Start-up Nation",
    author: "Dan Senor & Saul Singer",
    topic: "Economics",
  },
];

if (localStorage.getItem("list-books") == null) {
  localStorage.setItem("list-books", JSON.stringify(defaultBooks));
}

const handleAdd = (e) => {
  if (e.className === "btn-add btn-type") {
    modalAdd.style.display = "flex";
    document.querySelector("#name-input").value = "";
    document.querySelector("#author-input").value = "";
    document.querySelector("#topic-input").value = "Programing";
  } else if (e.className === "modal-add-btn btn-type") {
    const name = document.querySelector("#name-input").value;
    const author = document.querySelector("#author-input").value;
    const topic = document.querySelector("#topic-input").value;
    const listBooks = localStorage.getItem("list-books")
      ? JSON.parse(localStorage.getItem("list-books"))
      : [];
    listBooks.push({
      name,
      author,
      topic,
    });
    localStorage.setItem("list-books", JSON.stringify(listBooks));
    console.log(JSON.parse(localStorage.getItem("list-books")));
    renderData();
    modalAdd.style.display = "none";
  } else {
    modalAdd.style.display = "none";
  }
};

const renderData = () => {
  const data = localStorage.getItem("list-books")
    ? JSON.parse(localStorage.getItem("list-books"))
    : [];

  let listBooks = `
    <tr>
      <th>Name</th>
      <th>Author</th>
      <th>Topic</th>
      <th>Action</th>
    </tr>
  `;
  data.map((item) => {
    listBooks += `
      <tr>
        <td>${item.name}</td>
        <td>${item.author}</td>
        <td>${item.topic}</td>
        <td><a href="#" class="btn-delete" onclick="handleDelete(this)">Delete</a></td>
      </tr>
    `;
  });
  document.querySelector("#table").innerHTML = listBooks;
};

const handleDelete = (e) => {
  if (e.className === "btn-delete") {
    document.querySelector("#box-modal-confirm").style.display = "flex";

    document
      .querySelector(".confirm-delete-btn")
      .addEventListener("click", () => {
        let listBooks = JSON.parse(localStorage.getItem("list-books"));
        const item = e.closest("tr").rowIndex;
        if (item > 0) {
          console.log("row: ", item);
          listBooks.splice(item - 1, 1);
          localStorage.setItem("list-books", JSON.stringify(listBooks));
          renderData();
        }
        modalDelete.style.display = "none";
      });
  } else {
    document.querySelector("#box-modal-confirm").style.display = "none";
  }
};

let dataSearch = [];

const handleSearch = (e) => {
  const valueSearchInput = e.value;
  const search = JSON.parse(localStorage.getItem("list-books"));
  const value = search.filter((value) => {
    return value.name.toUpperCase().includes(valueSearchInput.toUpperCase());
  });

  let listBooks = `
    <tr>
      <th>Name</th>
      <th>Author</th>
      <th>Topic</th>
      <th>Action</th>
    </tr>
  `;

  value.map((value) => {
    listBooks += `
      <tr>
        <td>${value.name}</td>
        <td>${value.author}</td>
        <td>${value.topic}</td>
        <td><a href="#" class="btn-delete" onclick="handleDelete(this)">Delete</a></td>
      </tr>
    `;
  });
  document.querySelector("#table").innerHTML = listBooks;
};
