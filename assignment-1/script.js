// Your JS code goes here
genBooks()
renderTableRowsFromBooks()

function genBooks() {
    localStorage.setItem("books", JSON.stringify([
        { "name": "Refactoring", "author": "Martin Fowler", "topic": "Programming" },
        { "name": "Designing Data-Intensive Applications", "author": "Martin Kleppmann", "topic": "Database" },
        { "name": "The Phoenix Project", "author": "Gene Kim", "topic": "DevOps" }
    ]))
}

function renderTableRowsFromBooks() {
    rows = ""
    searchBookName = document.getElementById("searchBookInput").value;

    books = JSON.parse(localStorage.getItem("books"))
    books.forEach((book, index) => {
        if (searchBookName === undefined || book.name.toLowerCase().includes(searchBookName.toLowerCase())) {
            rows = rows + `
                    <tr>
                        <td>`+ book.name + `</td>
                        <td>`+ book.author + `</td>
                        <td>`+ book.topic + `</td>
                        <td><a onclick="toggleDeleteBookPopup(`+ index + `)">Delete</a></td>
                    <tr>
                    `
        }
    });

    table = document.getElementById("bookTableBody");
    table.innerHTML = rows
}

function toggleDeleteBookPopup(index) {
    book = JSON.parse(localStorage.getItem("books"))[index]

    bookName = document.getElementById("deleteBookPopupBookName");
    bookName.innerHTML = book.name

    deleteBookPopup = document.getElementById("deleteBookPopup");
    deleteBookPopup.setAttribute("bookindex", index);

    togglePopup('deleteBookPopup', true)
}

function togglePopup(popupID, value) {
    popup = document.getElementById(popupID);
    popup.setAttribute("show", value);
    popup.focus()

    inputElement = popup.querySelectorAll('#'+popupID+' input')
    if (inputElement.length > 0) {
        inputElement[0].focus()
    }
}

function addBook(formID) {
    inputs = document.querySelectorAll('#'+formID+' input, #'+formID+' select');
    book = {}
    inputs.forEach(element => {
        book[element.getAttribute("name")] = element.value
    });

    books = JSON.parse(localStorage.getItem("books"))
    books.push(book)

    localStorage.setItem("books", JSON.stringify(books))

    togglePopup('addBookPopup', false)
    document.getElementById(formID).reset();
    renderTableRowsFromBooks()
}

function deleteBook() {
    deleteBookPopup = document.getElementById("deleteBookPopup");
    index = deleteBookPopup.getAttribute("bookindex");

    books = JSON.parse(localStorage.getItem("books"))
    books.splice(index, 1)

    localStorage.setItem("books", JSON.stringify(books))

    togglePopup('deleteBookPopup', false)
    renderTableRowsFromBooks()
}
