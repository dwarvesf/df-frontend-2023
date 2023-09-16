// Your JS code goes here

const createElementFromHTML = (htmlString) => {
  if (htmlString[1] == "t" && htmlString[2] == "r") {
    // case <tr></tr>
    const table = document.createElement("table");
    table.innerHTML = htmlString.trim();
    return table.firstChild;
  } else {
    const div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }
};

const handleOnDelete = () => {
  // add onClick for delete button on table
  const deleteBtns = document.getElementsByClassName("delete-action");
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", () => {
      const confirmDeleteCard = document.getElementById("confirm-delete-card");
      confirmDeleteCard.classList.remove("dn");
      confirmDeleteCard.classList.add("df");
      confirmDeleteCard.dataset.id = deleteBtns[i].dataset.id;

      document.getElementById("name-to-delete").innerText =
        deleteBtns[i].dataset.id;
    });
  }
};

const updateTable = (data) => {
  const table = document.getElementById("table");

  // clean the old table
  let lastChild = table.lastElementChild;
  while (lastChild != table.firstElementChild) {
    table.removeChild(lastChild);
    lastChild = table.lastElementChild;
  }

  // check if data is empty
  if (data.length === 0) {
    table.appendChild(
      createElementFromHTML(
        `<tr>
          <td>Data is empty</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>`
      )
    );
  } else {
    data.map((dat) => {
      table.appendChild(
        createElementFromHTML(
          `<tr>
              <td>${dat.name}</td>
              <td>${dat.author}</td>
              <td>${dat.topic}</td>
              <td><div data-id="${dat.name}" class="delete-action">Delete</div></td>
            </tr>`
        )
      );

      return dat;
    });

    handleOnDelete();
  }
};

// Init books
const booksList = JSON.parse(localStorage.getItem("books")) || [
  {
    name: "Refactoring",
    author: "Martin Fowler",
    topic: "Programming",
  },
  {
    name: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    topic: "Database",
  },
  {
    name: "The Phoenix Project",
    author: "Gene Kim",
    topic: "DevOps",
  },
  {
    name: "A song of ice and fire",
    author: "George R. R. Martin",
    topic: "Fantasy",
  },
  {
    name: "Lord of the Rings",
    author: "J. R. R. Tolkien",
    topic: "Fantasy",
  },
  {
    name: "Sherlock Holmes",
    author: "Arthur Conan Doyle",
    topic: "Detective",
  },
  {
    name: "Romance of the Three Kingdoms",
    author: "Luo Guanzhong",
    topic: "History",
  },
];
updateTable(booksList);
localStorage.setItem("books", JSON.stringify(booksList));

// Add topic for select input in create-new-book card
const topics = [
  "Programming",
  "Database",
  "DevOps",
  "Fantasy",
  "Detective",
  "History",
];
topics.map((topic) => {
  document
    .getElementById("topic")
    .appendChild(
      createElementFromHTML(`<option value="${topic}">${topic}</option>`)
    );
});

// add onClick for "Add book" button
document.getElementById("add-book-btn").addEventListener("click", () => {
  const card = document.getElementById("add-book-card");
  card.classList.remove("dn");
  card.classList.add("df");
});

// add onClick for create button
document.getElementById("create-new-book").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const author = document.getElementById("author").value;
  const topic = document.getElementById("topic").value;

  if (!name || !author || !topic) {
    const warningContainer = document.getElementById("warning");
    const warningChild = createElementFromHTML(
      `<div class="warning">Please fill correctly!</div>`
    );
    if (warningContainer.hasChildNodes()) {
      warningContainer.removeChild(warningContainer.firstChild);
    }
    warningContainer.appendChild(warningChild);
  } else {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    books.push({
      name,
      author,
      topic,
    });
    updateTable(books);
    localStorage.setItem("books", JSON.stringify(books));

    const card = document.getElementById("add-book-card");
    card.classList.remove("df");
    card.classList.add("dn");
    alert("Create success");
  }
});

// add onClick for close-icon button
const closeBtns = document.getElementsByClassName("close-icon");
for (let i = 0; i < closeBtns.length; i++) {
  closeBtns[i].addEventListener("click", () => {
    const cardContainer =
      closeBtns[i].parentElement.parentElement.parentElement;
    cardContainer.classList.remove("df");
    cardContainer.classList.add("dn");
    const warningContainer = document.getElementById("warning");
    if (warningContainer.hasChildNodes()) {
      warningContainer.removeChild(warningContainer.firstChild);
    }
  });
}

// add onClick for cancel button in delete card
document.getElementById("cancel-delete").addEventListener("click", () => {
  const confirmDeleteCard = document.getElementById("confirm-delete-card");
  confirmDeleteCard.classList.remove("df");
  confirmDeleteCard.classList.add("dn");
});

// add onClick for delete-confirmed button in delete card
document.getElementById("delete-confirmed").addEventListener("click", () => {
  const confirmDeleteCard = document.getElementById("confirm-delete-card");

  const books = JSON.parse(localStorage.getItem("books")) || [];
  const booksAfterDelete = books.filter(
    (book) => book.name != confirmDeleteCard.dataset.id
  );

  updateTable(booksAfterDelete);
  localStorage.setItem("books", JSON.stringify(booksAfterDelete));

  confirmDeleteCard.classList.remove("df");
  confirmDeleteCard.classList.add("dn");

  alert("Book deleted");
});

// add onClick for search button
document.getElementById("search-btn").addEventListener("click", () => {
  const val = document.getElementById("search-field").value;
  const reg = new RegExp(val, "gi");

  const books = JSON.parse(localStorage.getItem("books")) || [];
  const filteredBooks = books.filter((book) => book.name.search(reg) > -1);

  if (filteredBooks.length === 0) {
    alert("No book found");
  } else {
    updateTable(filteredBooks);
  }
});
