var elementLength,
  optionLength,
  selectElement,
  selectSelectedEle,
  selectItemsEle;
/*look for any elements with the class "custom-select":*/
var x = document.getElementsByClassName("form-control-group");

elementLength = x.length;

for (let i = 0; i < elementLength; i++) {
  if (!x[i].getElementsByTagName("select")[0]) continue;
  selectElement = x[i].getElementsByTagName("select")[0];
  optionLength = selectElement.length;
  console.log("optionLength: ", optionLength);
  /*for each element, create a new DIV that will act as the selected item:*/
  //! a -> selectSelectedEle
  selectSelectedEle = document.createElement("div");
  selectSelectedEle.setAttribute(
    "class",
    " select-results select-selected select-selected__rendered"
  );
  selectSelectedEle.innerHTML =
    selectElement.options[selectElement.selectedIndex].innerHTML;

  x[i].appendChild(selectSelectedEle);
  /*for each element, create a new DIV that will contain the option list:*/
  //! b -> selectItemsEle
  selectItemsEle = document.createElement("div");
  selectItemsEle.setAttribute("class", "select-results__options select-hide");

  //! c -> optionElement
  //! j = 1
  for (let j = 0; j < optionLength; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    const optionElement = document.createElement("div");
    optionElement.setAttribute("class", "select-results__option");
    optionElement.innerHTML = selectElement.options[j].innerHTML;
    optionElement.addEventListener("click", function (e) {
      //! Delete effect focus

      /*when an item is clicked, update the original select box,
        and the selected item:*/
      var y, i, k, s, h, sl, yl;
      //! catch parent
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName(
            "select-results__option__selected"
          );
          yl = y.length;
          for (k = 0; k < yl; k++) {
            // y[k].removeAttribute("class");
            y[k].setAttribute("class", "select-results__option");
          }
          this.setAttribute("class", "select-results__option__selected");
          break;
        }
      }
      h.click();
    });

    selectItemsEle.appendChild(optionElement);
  }

  x[i].appendChild(selectItemsEle);

  selectSelectedEle.addEventListener("click", function (e) {
    //! add Effect Focus
    /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(element) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (element == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
