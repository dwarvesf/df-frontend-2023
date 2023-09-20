let bookStorageData = [
    {title: "Example 1", author: "Kevin A", topic: "Topic A"},
    {title: "Example 2", author: "Kevin B", topic: "Topic B"},
    {title: "Examples 3", author: "Kevins C", topic: "Topics C"}
];

localStorage.setItem("bookStorage", JSON.stringify(bookStorageData));


const bookList = document.getElementById("book-list");

function displayBooks() {
    const booksListArr = JSON.parse(localStorage.getItem('bookStorage'));

    bookList.innerHTML = '';
    for (let i = 0; i < booksListArr.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${booksListArr[i].title}</td>
                <td>${booksListArr[i].author}</td>
                <td>${booksListArr[i].topic}</td>
                <td><a class="red" href="#" onclick="deleteBook(${i},'${booksListArr[i].title}')">Delete</a></td>
            `;
        bookList.appendChild(row);
    }
}


function searching(searchText) {
    const booksListArr = JSON.parse(localStorage.getItem('bookStorage'));
    var searchRexgex = new RegExp(searchText, 'i');
    let booksListResult = booksListArr.filter(item => searchRexgex.test(item.title.toLowerCase()));
    bookList.innerHTML = '';
    for (let i = 0; i < booksListResult.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${booksListResult[i].title}</td>
                <td>${booksListResult[i].author}</td>
                <td>${booksListResult[i].topic}</td>
                <td><a class="red" href="#" onclick="deleteBook(${i},'${booksListResult[i].title}')">Delete</a></td>
            `;
        bookList.appendChild(row);
    }

}

function deleteBook(index, name) {
    btnDelModalClick(index, name);
}


displayBooks();


function submited(){

    var name = document.getElementById('name').value;
    var author = document.getElementById('author').value;
    var topic = document.getElementById('topic').value;
    const datarow = {title: name, author: author, topic: topic};

    const booksListArr = JSON.parse(localStorage.getItem('bookStorage'));
    booksListArr.push(datarow);
    localStorage.setItem("bookStorage", JSON.stringify(booksListArr));

    modal.style.display = 'none';

    document.getElementById('name').value = '';
    document.getElementById('author').value = '';
    document.getElementById('topic').value = 'PRO';
    displayBooks();
}


var delDataBtn = document.getElementById('delDataBtn');

delDataBtn.addEventListener('click', function () {
    var index = document.getElementById('delIndex').value;

    const booksListArr = JSON.parse(localStorage.getItem('bookStorage'));
    booksListArr.splice(index, 1);
    localStorage.setItem("bookStorage", JSON.stringify(booksListArr));
    delModal.style.display = 'none';
    displayBooks();
});

/*MODAL */

var modal = document.getElementById("myModal");
var delModal = document.getElementById("delModal");
var span = document.getElementById("close");
var spanDel = document.getElementById("delClose");
var btnDel = document.getElementById("btn-close");


function btnModalClick(hrefData) {
    modal.style.display = "block";
}

function btnDelModalClick(index, name) {
    document.getElementById("delName").innerHTML = name;
    document.getElementById("delIndex").value = index;
    delModal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}
spanDel.onclick = function () {
    delModal.style.display = "none";
}
btnDel.onclick = function () {
    delModal.style.display = "none";
}


