"use strict";
import { Book } from "./models.js";
import { iptNameModal, iptAuthorModal, sltTopicModal, resetForm } from "./modalBook.js";
import { dialog, generateMessageDialog, btnDeleteDialog } from "./dialog.js";

const tbodyElement = document.getElementById("tbody");
const btnAddBookModal = document.getElementById("modal__btn-add-book");
const iptSearch = document.getElementById("ipt-search");

//! initial or get data
let bookDocArr = Book._getBooks();
console.log(
  "__Debugger__tableBook\n:::nmodule :::bookDocArr: ",
  bookDocArr,
  "\n"
);
function generateBookRowElement(bookDoc, index) {
  const tableRowElement = document.createElement("tr");
  tableRowElement.setAttribute("data-id", bookDoc.id);
  tableRowElement.innerHTML = `
    <td>${index + 1}</td>
    <td class="text-align--left">${bookDoc.name}</td>
    <td>${bookDoc.author}</td>
    <td>${bookDoc.topic}</td>
    <td class="text-align--right">
      <button class="btn btn-delete">
        <img src="../assets/icons/icon__delete.svg" alt="icon__delete.svg" />
      </button>
    </td>
  `;
  return tableRowElement;
}

function renderBookTable(bookDocs) {
  if (bookDocs.length === bookDocArr.length) {
    bookDocs = Book._getBooks();
  }

  tbodyElement.innerHTML = "";

  bookDocs.forEach((bookDoc, index) => {
    const rowElement = generateBookRowElement(bookDoc, index);
    tbodyElement.appendChild(rowElement);
  });
}

function validateBookData() {
  if (!iptNameModal.value) return false;
  return true;
}

//! event function to Add new Book
function handleClickAddBook(event) {
  //! validate
  const validate = validateBookData();
  if (!validate) return;

  const bookData = {
    name: iptNameModal.value,
    author: iptAuthorModal.value,
    topic: sltTopicModal.value,
  };

  Book.create(bookData);

  //! reset Form
  resetForm();

  //! re-render Table
  renderBookTable(bookDocArr);
}

let selectedBookId;

function handleBookList(event) {
  const this_pointer = event.target.closest("tr");
  if (!this_pointer) return;

  selectedBookId = this_pointer.dataset.id;

  const bookDoc = Book.findOneById(selectedBookId);

  if (event.target.closest(".btn-delete")) {
    const msg = `Do you want to delete ${bookDoc.name} book.`;
    generateMessageDialog(msg);
    dialog.style.display = "block";
  }
}

function handleClickDeleteBook(event) {
  //! delete Book
  Book.findOneAndRemove(selectedBookId);
  dialog.style.display = "none";

  //! re-render Table
  renderBookTable(bookDocArr);
}

function handleChangeSearch(event) {
  const value = event.target.value;
  console.log("value: ", value);

  console.log("bookDocArr: ", bookDocArr);
  const bookDocArrFiltered = bookDocArr.filter((book) => {
    console.log(book);
    return value === "" ? true : book.name.toLowerCase().indexOf(value) !== -1;
  });

  console.log("bookDocArrFiltered: ", bookDocArrFiltered);
  renderBookTable(bookDocArrFiltered);
}

//! Event Handler for create Book click
btnAddBookModal.addEventListener("click", handleClickAddBook);

//! Event Handler for Book Table Body
tbodyElement.addEventListener("click", handleBookList);

btnDeleteDialog.addEventListener("click", handleClickDeleteBook);

iptSearch.addEventListener("change", handleChangeSearch);

renderBookTable(bookDocArr);
