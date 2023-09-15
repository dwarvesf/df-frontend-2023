import {handleGetBookList} from './bookManagement.js';
import {searchInput, handleRenderBookList} from './script.js';

// Function to handle book search
const handleSearchBook = (event) => {
	const filter = [];
	const searchValue = event.target.value.toLowerCase();

	// Iterate through the book list and filter based on search value
	handleGetBookList().forEach((book) => {
		const bookName = book.name.toLowerCase();
		if (bookName.includes(searchValue)) {
			filter.push(book);
		}
	});

	// Render the filtered book list or the complete book list
	if (searchValue) {
		handleRenderBookList(filter);
	} else {
		handleRenderBookList(handleGetBookList());
	}
};

// Add event listener to search input
searchInput.addEventListener('keyup', handleSearchBook);
