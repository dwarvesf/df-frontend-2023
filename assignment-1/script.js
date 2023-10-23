// Your JS code goes here
// Your JS code goes here

let addBookBtn = document.getElementById("btn");
let createModal = document.getElementById("create-modal");
let deleteModal = document.getElementById("delete-modal");

let close = document.getElementsByClassName("close");
let table = document.getElementsByTagName("table")[0];
let input = document.getElementsByClassName("modal-input");

let deleteBooks = document.getElementsByClassName("deleteBookBtn")[0];
let addBtn = document.getElementsByClassName("addBookBtn")[0];

addBookBtn.onclick = () => {
  createModal.style.display = "block";
};
close[0].onclick = () => {
  createModal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == createModal) {
    createModal.style.display = "none";
  }
};

close[1].onclick = () => {
  deleteModal.style.display = "none";
};
document.getElementsByClassName("cancelDeletion")[0].onclick = () => {
  deleteModal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == deleteModal) {
    deleteModal.style.display = "none";
  }
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if(input[0].value == ''){
    alert('Please enter a name');
    return
  }
  let tableRow = document.createElement("tr");

  let name = document.createElement("td");
  let author = document.createElement("td");
  let topic = document.createElement("td");
  let action = document.createElement("td");

  name.innerHTML = input[0].value;
  author.innerHTML = input[1].value;
  topic.innerHTML = input[2].value;
  action.innerHTML = `<a class='deleteAction' onclick='deleteRow(this)'>Delete</a>`;

  tableRow.appendChild(name);
  tableRow.appendChild(author);
  tableRow.appendChild(topic);
  tableRow.appendChild(action);

  table.appendChild(tableRow);

  // todo  localStorage()

  createModal.style.display = "none";
});


var rowToDelete;

function deleteRow(r) {
  deleteModal.style.display = "block";
  rowToDelete = r.parentNode.parentNode.rowIndex;
  document.querySelector(
    ".modal-body p"
  ).innerHTML = `Do you want to delete <strong>${table.rows[rowToDelete].cells[0].textContent}</strong> book ?`;
}

deleteBooks.addEventListener("click", (e) => {
  table.deleteRow(rowToDelete);
  deleteModal.style.display = "none";
});
