import {
	addModalContainer, // Container for the add book modal
	deleteModalContainer, // Container for the delete book modal
	addButton, // Add button
	closeDeleteModalButton, // Close button for the add modal
} from './script.js';

// Show the add book modal
const showModalAdd = (e) => {
	e.preventDefault();
	addModalContainer.classList.add('active-modal');
};

// Hide the add book modal
const hideAddModal = (e) => {
	addModalContainer.classList.remove('active-modal');
};

// Hide the delete book modal
const hideDeleteModal = (e) => {
	deleteModalContainer.classList.remove('active-modal');
};

addButton.addEventListener('click', showModalAdd);
closeDeleteModalButton.addEventListener('click', hideAddModal);
closeDeleteModalButton.addEventListener('click', hideDeleteModal);
