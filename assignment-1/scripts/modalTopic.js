const dialogAdd = document.getElementById("dialog-add");
const btnAddBookElement = document.getElementById("btn-add-book");
const btnAddBookModal = document.getElementById("modal__btn-add-book");
const btnAddTopicModal = document.getElementById("modal__btn-add-topic");
const btnCloseModal = document.getElementById("modal__btn-close");

export const iptNameModal = document.getElementById("modal__ipt-name");

export function resetForm() {
  iptNameModal.value = "";
}

//! event hanlder for create book button
btnAddBookElement.addEventListener("click", function () {
  dialogAdd.style.display = "block";
});

function handleClickClose(event) {
  dialogAdd.style.display = "none";
  resetForm();
}

btnCloseModal.addEventListener("click", handleClickClose);

window.addEventListener("click", function (event) {
  if (event.target == dialogAdd) {
    dialogAdd.style.display = "none";
    resetForm();
  }
});
