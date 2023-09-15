import {handleGetBookList} from './bookManagement.js';

// DOM elements
export const formAddBook = document.querySelector('.form-add-book');
export const inputName = document.querySelector('#name');
export const inputAuthor = document.querySelector('#author');
export const selectTopic = document.querySelector('#topic');
export const searchInput = document.querySelector('.search-input');
export const deleteModal = document.querySelector('.delete-modal');
export const deleteBookButton = document.querySelector('#delete-book-button');
export const cancelBookButton = document.querySelector('#cancel-book-button');
export const addButton = document.querySelector('.add-button');
export const addModalContainer = document.querySelector('.add-modal');
export const deleteModalContainer = document.querySelector('.delete-modal');
export const closeAddModalButton = document.querySelector('#close-modal-add');
export const closeDeleteModalButton =
	document.querySelector('#close-btn-delete');
export const bookNameSpan = document.querySelector('.book-name');

// Sample book list data
export const bookListArr = [
	{
		name: 'Refactoring',
		author: 'Martin Fowler',
		topic: 'Programming',
	},
	{
		name: 'Design Data-Intensive Applications',
		author: 'Martin Kleppman',
		topic: 'Database',
	},
	{
		name: 'The Phoenix Project',
		author: 'Gene Kim',
		topic: 'DevOps',
	},
];

// Render the book list
export const handleRenderBookList = (bookList) => {
	const tbody = document.querySelector('tbody');
	tbody.innerHTML = '';

	bookList.forEach((book, index) => {
		const newRow = document.createElement('tr');
		newRow.classList.add('book-item');

		// Create table cells for book data
		newRow.innerHTML = `
      <td>${book.name}</td>
      <td>${book.author}</td>
      <td>${book.topic}</td>
      <td class="delete" value="${index}">Delete</td>
    `;

		tbody.appendChild(newRow);
	});
};

// Call handleRenderBookList with the book list obtained from handleGetBookList,
// or the default bookListArr if handleGetBookList returns null or undefined
handleRenderBookList(handleGetBookList() || bookListArr);
