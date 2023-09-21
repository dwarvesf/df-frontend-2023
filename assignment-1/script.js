document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector('tbody');
    const searchInput = document.getElementById('search-input');
    const addBookButton = document.getElementById('add-book-button');
    const modal = document.getElementById('add-modal');
    const closeModal = document.querySelector('.close');
    const deleteModal = document.getElementById('delete-modal');
    const closeDeleteModal = document.querySelector('.close-delete');
    const addButton = document.getElementById('add-button');
    const deleteSubmit = document.getElementById('delete-button');

    let books = JSON.parse(localStorage.getItem('books')) || [];
    let currentInd = 0;

    function saveDataToLocalStorage() {
        localStorage.setItem('books', JSON.stringify(books));
    }

    function populateTable(data) {
        tableBody.innerHTML = '';
        data.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.topic}</td>
                <td><button class="button button--link delete-button">Delete</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    function openDeleteModal(bookTitle) {
        const deleteModal = document.getElementById('delete-modal');
        const titlePlaceholder = document.getElementById('book-title');
        titlePlaceholder.textContent = bookTitle;
        deleteModal.style.display = 'block';
    }

    populateTable(books);

    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(book => book.name.toLowerCase().includes(searchTerm));
        populateTable(filteredBooks);
    });

    addBookButton.addEventListener('click', function () {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    closeDeleteModal.addEventListener('click', function () {
        deleteModal.style.display = 'none';
    });

    addButton.addEventListener('click', function () {
        const name = document.getElementById('name-input').value;
        const author = document.getElementById('author-input').value;
        const topic = document.getElementById('topic-input').value;

        if (name && author && topic) {
            const newBook = { name, author, topic };
            books.push(newBook);
            populateTable(books);

            saveDataToLocalStorage();

            document.getElementById('name-input').value = '';
            document.getElementById('author-input').value = '';
            document.getElementById('topic-input').value = '';

            modal.style.display = 'none';
        }
    });

    deleteSubmit.addEventListener('click', function () {
        books.splice(currentInd, 1);
        populateTable(books);
        saveDataToLocalStorage();
        deleteModal.style.display = 'none';
    });

    tableBody.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-button')) {
            const row = e.target.closest('tr');
            const bookName = row.querySelector('td').textContent;
            currentInd = books.findIndex(book => book.name === bookName);

            if (currentInd !== -1) {
                openDeleteModal(bookName);
            }
        }
    });
});
