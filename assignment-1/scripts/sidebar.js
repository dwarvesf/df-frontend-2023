"use strict";
import {
  deleteLocalStorage,
  getFromLocalStorage,
  saveToLocalStorage,
} from "./storage.js";

const sidebar = document.getElementById("sidebar");
const btnExpand = document.getElementById("btn-expand");
const sidebarList = document.getElementById("sidebar-list");
// const sidebarItemHome = document.getElementById("sidebar-home");

//! initialize sidebar
let sidebarState = {
  active: true,
  activeItemName: "sidebar-home",
};

export function renderSidebar() {
  //! check sidebar in localStorage to update for sidebarState
  if (getFromLocalStorage("sidebarStorage") === null) {
    saveToLocalStorage("sidebarStorage", sidebarState);
  } else {
    //! get data in localStorage
    sidebarState = getFromLocalStorage("sidebarStorage");
  }

  //! SIDEBAR-ACTIVE
  if (sidebarState.active) {
    sidebar.classList.add("active");
  } else {
    sidebar.classList.remove("active");
  }

  //! SIDEBAR-ITEM
  const sidebarItemElement = document.getElementById(
    sidebarState.activeItemName
  );
  sidebarItemElement.classList.add("active");
}

function handleClickExpand() {
  sidebarState.active = !sidebarState.active;
  saveToLocalStorage("sidebarStorage", sidebarState);
  //!
  if (sidebarState.active) {
    sidebar.classList.add("active");
  } else {
    sidebar.classList.remove("active");
  }
}

function handleClickSidebarList(e) {
  const this_pointer = e.target.closest("li");
  if (!this_pointer) return;

  //! clear
  let sidebarItemElement = document.getElementById(sidebarState.activeItemName);
  sidebarItemElement.classList.remove("active");

  sidebarState = { ...sidebarState, activeItemName: this_pointer.id };
  saveToLocalStorage("sidebarStorage", sidebarState);

  sidebarItemElement = document.getElementById(sidebarState.activeItemName);
  sidebarItemElement.classList.add("active");
}

//! EventListener
btnExpand.addEventListener("click", handleClickExpand);
sidebarList.addEventListener("click", handleClickSidebarList);
