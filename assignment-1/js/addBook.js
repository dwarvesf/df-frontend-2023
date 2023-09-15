import {
	inputName, // Input field for book name
	inputAuthor, // Input field for book author
	selectTopic, // Select dropdown for book topic
	addModalContainer, // Modal container for adding a book
	formAddBook, // Form element for adding a book
	handleRenderBookList, // Function to render the book list
} from './js/script.js';

import {
	handleSaveBooks, // Function to save books to storage
	handleGetBookList, // Function to retrieve the book list from storage
} from './js/bookManagement.js';

// Handle the form submission event for adding a book
const handleSubmitFormAddBook = (e) => {
	e.preventDefault();

	const formValue = {
		name: inputName.value,
		author: inputAuthor.value,
		topic: selectTopic.options[selectTopic.selectedIndex].value,
	};

	const newListBook = [...handleGetBookList(), formValue];

	handleSaveBooks(newListBook);
	handleRenderBookList(newListBook);

	inputName.value = '';
	inputAuthor.value = '';

	addModalContainer.classList.remove('active-modal');
};

formAddBook.addEventListener('submit', handleSubmitFormAddBook);
