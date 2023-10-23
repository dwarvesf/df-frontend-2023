"use strict";
import { Topic } from "./models.js";
import { iptNameModal, resetForm } from "./modalTopic.js";
import { dialog, generateMessageDialog, btnDeleteDialog } from "./dialog.js";

const tbodyElement = document.getElementById("tbody");
const btnAddtopicModal = document.getElementById("modal__btn-add-topic");
const iptSearch = document.getElementById("ipt-search");

//! initial or get data
let topicDocArr = Topic._getTopics();
console.log(
  "__Debugger__tabletopic\n:::nmodule :::topicDocArr: ",
  topicDocArr,
  "\n"
);
function generatetopicRowElement(topicDoc, index) {
  const tableRowElement = document.createElement("tr");
  tableRowElement.setAttribute("data-id", topicDoc.id);
  tableRowElement.innerHTML = `
    <td>${index + 1}</td>
    <td class="text-align--left">${topicDoc.name}</td>
    <td class="text-align--right">
      <button class="btn btn-delete">
        <img src="../assets/icons/icon__delete.svg" alt="icon__delete.svg" />
      </button>
    </td>
  `;
  return tableRowElement;
}

function rendertopicTable(topicDocs) {
  if (topicDocs.length === topicDocArr.length) {
    topicDocs = Topic._getTopics();
  }

  tbodyElement.innerHTML = "";

  topicDocs.forEach((topicDoc, index) => {
    const rowElement = generatetopicRowElement(topicDoc, index);
    tbodyElement.appendChild(rowElement);
  });
}

function validateTopicData() {
  if (!iptNameModal.value) return false;
  return true;
}

//! event function to Add new topic
function handleClickAddtopic(event) {
  //! validate
  const validate = validateTopicData();
  if (!validate) return;

  const topicData = {
    name: iptNameModal.value,
  };

  Topic.create(topicData);

  //! reset Form
  resetForm();

  //! re-render Table
  rendertopicTable(topicDocArr);
}

let selectedTopicId;

function handleTopicList(event) {
  const this_pointer = event.target.closest("tr");
  if (!this_pointer) return;

  selectedTopicId = this_pointer.dataset.id;

  const topicDoc = Topic.findOneById(selectedTopicId);
  console.log(
    "__Debugger__tableTopic\n:::nmodule :::topicDoc: ",
    topicDoc,
    "\n"
  );

  if (event.target.closest(".btn-delete")) {
    const msg = `Do you want to delete ${topicDoc.name} topic.`;
    generateMessageDialog(msg);
    dialog.style.display = "block";
  }
}

function handleClickDeletetopic(event) {
  //! delete topic
  Topic.findOneAndRemove(selectedTopicId);
  dialog.style.display = "none";

  //! re-render Table
  rendertopicTable(topicDocArr);
}

function handleChangeSearch(event) {
  const value = event.target.value;
  console.log("value: ", value);

  console.log("topicDocArr: ", topicDocArr);
  const topicDocArrFiltered = topicDocArr.filter((topic) => {
    console.log(topic);
    return value === "" ? true : topic.name.toLowerCase().indexOf(value) !== -1;
  });

  console.log("topicDocArrFiltered: ", topicDocArrFiltered);
  rendertopicTable(topicDocArrFiltered);
}

//! Event Handler for create topic click
btnAddtopicModal.addEventListener("click", handleClickAddtopic);

//! Event Handler for topic Table Body
tbodyElement.addEventListener("click", handleTopicList);

btnDeleteDialog.addEventListener("click", handleClickDeletetopic);

iptSearch.addEventListener("change", handleChangeSearch);

rendertopicTable(topicDocArr);
