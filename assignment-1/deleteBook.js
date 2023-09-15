import {
	deleteModal,
	bookNameSpan,
	deleteBookButton,
	cancelBookButton,
	handleRenderBookList,
} from './script.js';
import {handleSaveBooks, handleGetBookList} from './bookManagement.js';

let idBookToDelete;

// Deletes a book from the book list and updates the UI.
const handleDeleteBook = (id) => {
	const bookList = handleGetBookList();
	const updatedBookList = bookList.filter((item, index) => index !== id);
	handleSaveBooks(updatedBookList);
	handleRenderBookList(updatedBookList);
};

// Opens the delete modal and sets the book name to be deleted.
const handleOpenDeleteModal = (e) => {
	if (e.target.tagName === 'TD' && e.target.classList.contains('delete')) {
		deleteModal.classList.add('active-modal');
		idBookToDelete = +e.target.getAttribute('value');
		bookNameSpan.textContent = handleGetBookList()[idBookToDelete].name;
	}
};

// Closes the delete modal.
const handleCloseDeleteModal = () => {
	deleteModal.classList.remove('active-modal');
};

// Handles the confirmation to delete a book.
const handleConfirmDelete = () => {
	deleteModal.classList.remove('active-modal');
	handleDeleteBook(idBookToDelete);
};

window.addEventListener('click', handleOpenDeleteModal);
deleteBookButton.addEventListener('click', handleConfirmDelete);
cancelBookButton.addEventListener('click', handleCloseDeleteModal);
