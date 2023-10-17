// import data from "../data/data.json" assert { type: "json" };
const openAddedFormBTN = document.getElementById("openAddedForm");
const displayAddedForm = document.getElementById("addedForm");
const createBookBTN = document.getElementById("createdBTN");
const table = document.querySelector("table tbody");
const closedBox=document.getElementsByClassName("closedBox")

let bookStore = [];

const saveStore = () => {
  localStorage.setItem("store", JSON.stringify(bookStore));
};

const renderStore = () => {
  let renderRow = ``;
  for (let book of bookStore) {
    renderRow += `
      <tr>
      <td>${book.name}</td>
      <td>${book.author}</td>
      <td>${book.topic}</td>
      <td><button type="button" class="deletedBookBTN" onclick="removeBook(${book.id})">Delete</button></td>
      </tr>`;
  }
  table.innerHTML = renderRow;
};

renderStore();

const removeBook = (id) => {
  let index = bookStore.findIndex((item) => item.id === id);
  if (index !== -1) {
    bookStore.splice(index, 1);
    saveStore();
    renderStore();
  }
};

const getStore = () => {
  if (localStorage.getItem("store")) {
    bookStore = JSON.parse(localStorage.getItem("store"));
    renderStore();
  }
};

getStore();

window.removeBook = (id) => {
  removeBook(id);
  renderStore();
};

const createBook = (event) => {
  event.preventDefault();
  let book = {};
  let bookInfo = document.querySelectorAll(
    "#addedForm input,#addedForm select"
  );

  for (let i = 0; i < bookInfo.length; i++) {
    let bookInput = bookInfo[i];
    let { name, value } = bookInput;
    book = { ...book, id: Date.now(), [name]: value };
  }
  bookStore.push(book);
  console.log("bookStore ->", bookStore);
  renderStore();
  saveStore();
};

openAddedFormBTN.onclick = () => {
  displayAddedForm.style.display = "block";
  createBookBTN.onclick = createBook;
  // displayAddedForm.style.display = "none";
};
