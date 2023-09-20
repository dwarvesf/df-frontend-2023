"use strict";

const tbodyElement = document.getElementById("tbody");

let bookArr = [];

if (getFromLocalStorage("bookStorage")) {
  bookArr = getFromLocalStorage("bookStorage");
} else {
  saveToLocalStorage("bookStorage", bookArr);
}

function generateRowElement(bookDoc, index) {
  const tableRowElement = document.createElement("tr");
  tableRowElement.innerHTML = `
    <td>${index + 1}</td>
    <td>${bookDoc.name}</td>
    <td>${bookDoc.author}</td>
    <td>${bookDoc.topic}</td>
    <td>action</td>
  `;
  return tableRowElement;
}

function renderBookTable() {
  tbodyElement.innerHTML = "";

  bookArr.forEach((book, index) => {
    const rowElement = generateRowElement(book, index);
    tbodyElement.appendChild(rowElement);
  });
  console.log("render Book Table");
}

//! event function for Click Add Book
function handleClickAddBook(event) {
  console.log(
    "__Debugger__table\n:::handleClickAddBook :::iptNameModal.value: ",
    iptNameModal.value,
    "\n"
  );
  console.log(
    "__Debugger__table\n:::handleClickAddBook :::iptAuthorModal.value: ",
    iptAuthorModal.value,
    "\n"
  );
  console.log(
    "__Debugger__table\n:::handleClickAddBook :::sltTopicModal.value: ",
    sltTopicModal.value,
    "\n"
  );
  const bookData = {
    name: iptNameModal.value,
    author: iptAuthorModal.value,
    topic: sltTopicModal.value,
  };
  console.log(
    "__Debugger__table\n:::handleClickAddBook :::bookData: ",
    bookData,
    "\n"
  );

  //! add Book into bookArr
  bookArr.push(bookData);
  //! save the bookArr into storage

  console.log(
    "__Debugger__table\n:::handleClickAddBook :::bookData: ",
    bookData,
    "\n"
  );

  saveToLocalStorage("bookStorage", bookArr);

  //! render new Book in page
  renderBookTable();
}

btnAddBookModal.addEventListener("click", handleClickAddBook);
