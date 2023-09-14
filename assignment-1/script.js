// Your JS code goes here
const input = document.getElementById("ipt-search");
console.log("input", input);

input.addEventListener("input", () => {
  input.setAttribute("value", input.value);
});
