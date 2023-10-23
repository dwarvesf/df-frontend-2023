export const dialog = document.getElementById("dialog");
export const dialogBody = document.getElementById("dialog-body");
export const btnDeleteDialog = document.getElementById("dialog__btn-delete");
export const btnCancelDialog = document.getElementById("dialog__btn-cancel");

export function generateMessageDialog(msg) {
  dialogBody.innerHTML = "";
  dialogBody.innerHTML = msg;
  // const pEle = messageElement.querySelectorAll("p")[0];
  // const messageElement = document.createElement("p");
  // messageElement.innerHTML = msg;
  // dialogBody.appendChild(messageElement);
}

//! backdrop cannt cancle
// dialog.addEventListener("click", function () {
//   dialog.style.display = "none";
// });

btnCancelDialog.addEventListener("click", function () {
  dialog.style.display = "none";
});
