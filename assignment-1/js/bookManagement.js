import {bookListArr} from './script.js';

// Saves the book list to the local storage.
export const handleSaveBooks = (bookList) => {
	localStorage.setItem('booklist', JSON.stringify(bookList));
};

// Gets the book list from the local storage.
// If the book list is not found, returns the default book list.
export const handleGetBookList = () => {
	const bookList = JSON.parse(localStorage.getItem('booklist'));
	return bookList || bookListArr;
};
