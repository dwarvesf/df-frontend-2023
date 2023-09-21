// const openAddedForm = document.querySelector("#openAddedForm");
const openAddedFormBTN = document.getElementById("openAddedForm");
const displayAddedForm = document.getElementById("addedForm");
const createBookBTN = document.getElementById("createdBTN");

const createBook = (event) => {
  event.preventDefault();
};
let bookStore = [];

createBookBTN.onclick = (event) => {
  event.preventDefault();
  // const bookName = document.getElementById("bookName").value;
  // const bookAuthor = document.getElementById("bookAuthor").value;
  // const bookTopic = document.getElementById("bookTopic").options;
  let book = {};
  let bookInfo = document.querySelectorAll(
    "#addedForm input,#addedForm select"
  );

  for (let i = 0; i < bookInfo.length; i++) {
    let bookInput = bookInfo[i];
    let { name, value } = bookInput;
    book = { ...book, [name]: value };
  }

  bookStore.push(book);
//   console.log("book->", bookStore);
  let bookRow = `<tr>`;
  //   bookRow += `
  //      <td>${book.name}</td>
  //      <td>${book.author}</td>
  //      <td>${book.topic}</td>
  //      <td><button>Delete</button></td>
  //     </tr>
  //     `;
  for (let i = 0; i < bookStore.length; i++) {
    console.log(`bookStore[${i}] ->`,bookStore[i]);
  }
  document.querySelector("table tbody").innerHTML = bookRow;
};

const handleAddedForm = () => {
  // displayAddedForm.style.display = "block";
};
const handleDeletedForm = () => {};
