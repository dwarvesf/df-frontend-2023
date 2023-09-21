import {
  deleteLocalStorage,
  getFromLocalStorage,
  saveToLocalStorage,
} from "./storage.js";

const dialogAdd = document.getElementById("dialog-add");
const btnAddBookElement = document.getElementById("btn-add-book");
const btnAddTopicModal = document.getElementById("modal__btn-add-topic");
const btnCloseModal = document.getElementById("modal__btn-close");

export const iptNameModal = document.getElementById("modal__ipt-name");
export const iptAuthorModal = document.getElementById("modal__ipt-author");
export const sltTopicModal = document.getElementById("modal__slt-topic");

//! initialize modal
let modalState = {
  topics: [{ name: "alo" }],
};

function renderModal() {
  //! check topicStorage in localStorage to update for modalState
  if (getFromLocalStorage("topicStorage") === null) {
    const topicStorage = [...modalState.topics];
    saveToLocalStorage("topicStorage", topicStorage);
  } else {
    //! get data from localStorage
    modalState.topics = [...getFromLocalStorage("topicStorage")];
  }

  const topicLength = modalState.topics.length;
  for (let i = 0; i < topicLength; i++) {
    const optionData = {
      value: modalState.topics[i].name,
      textContent: modalState.topics[i].name,
    };
    const optionElement = generateOptionElement(optionData);
    sltTopicModal.appendChild(optionElement);
  }
}

function generateOptionElement(optionData) {
  const optionElement = document.createElement("option");
  optionElement.value = optionData.value;
  optionElement.textContent = optionData.textContent;

  return optionElement;
}

export function resetForm() {
  iptNameModal.value = "";
  iptAuthorModal.value = "";
  sltTopicModal.value = "";
}

//! event hanlder for create book button
btnAddBookElement.addEventListener("click", function () {
  dialogAdd.style.display = "block";
});

btnCloseModal.addEventListener("click", function () {
  dialogAdd.style.display = "none";
  resetForm();
});

window.addEventListener("click", function (event) {
  if (event.target == dialogAdd) {
    dialogAdd.style.display = "none";
    resetForm();
  }
});

//! render Modal
renderModal();
