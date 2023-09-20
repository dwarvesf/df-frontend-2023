const modalAddBook = document.getElementById("modal-add-book");
const btnAddBookElement = document.getElementById("btn-add-book");
const btnAddBookModal = document.getElementById("modal__btn-add-book");
const btnCloseModal = document.getElementById("modal__btn-close");

const iptNameModal = document.getElementById("modal__ipt-name");
const iptAuthorModal = document.getElementById("modal__ipt-author");
const sltTopicModal = document.getElementById("modal__slt-topic");

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

btnAddBookElement.addEventListener("click", function () {
  modalAddBook.style.display = "block";
});

btnCloseModal.addEventListener("click", function () {
  modalAddBook.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == modalAddBook) {
    modalAddBook.style.display = "none";
  }
});
