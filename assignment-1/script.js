const data = [
	{
		id: 1,
		title: "Desert Winds",
		author: "Ashil Bitterton",
		topic: "Drama",
	},
	{
		id: 2,
		title: "Back to the Garden, Flower Power Comes Full Circle",
		author: "Ivory Bringloe",
		topic: "Documentary",
	},
	{
		id: 3,
		title: "Battle for the Planet of the Apes",
		author: "Ana Henricsson",
		topic: "Action",
	},
	{
		id: 4,
		title: "Getaway, The",
		author: "Erminia Skelbeck",
		topic: "Thriller",
	},
	{
		id: 5,
		title: "Below Sea Level",
		author: "Shantee Murdie",
		topic: "Documentary",
	},
	{
		id: 6,
		title: "Cosmos",
		author: "Sherry Sailer",
		topic: "Documentary",
	},
	{
		id: 7,
		title: "That Sinking Feeling",
		author: "Corabella Crellin",
		topic: "Comedy",
	},
	{
		id: 8,
		title: "Saints and Soldiers",
		author: "Ignatius Plowman",
		topic: "Adventure",
	},
	{
		id: 9,
		title: "Troma's War ",
		author: "Zorina Staneland",
		topic: "Action",
	},
	{
		id: 10,
		title: "Claudine",
		author: "Craggy Thowes",
		topic: "Drama",
	},
];

function getTopics() {
	let topics = new Set();
	data.forEach((item) => topics.add(item.topic));
	return [...topics];
}

function renderTableData(arr) {
	const tableBody = document.querySelector("#table-data tbody");
	tableBody.innerHTML = "";
	arr.forEach((item) => {
		const row = document.createElement("tr");
		row.innerHTML = `<td>${item.title}</td>
		<td>${item.author}</td>
		<td>${item.topic}</td>
		<td>
			<button class="btn del" onclick="handleDeleteItem(${item.id})">
				Delete
			</button>
		</td>`;

		tableBody.appendChild(row);
	});
}

function renderTopics() {
	let html = `<option class="form_select__default" selected disabled value="null">Select a topic</option>`;
	const topics = getTopics();
	const formSelect = document.querySelector(".form_select");
	topics.forEach((topic) => {
		html += `<option value="${topic}">${String(topic)}</option>`;
	});
	formSelect.innerHTML = html;
}

function handleDeleteItem(id) {
	const targetItemIndex = data.findIndex((item) => item.id === id);
	data.splice(targetItemIndex, 1);
	renderTableData(data);
}

function toggleModal(targetName) {
	const modalElement = document.querySelector(`.modal.${targetName}`);
	if (modalElement.classList.contains("active")) {
		modalElement.classList.remove("active");
	} else {
		modalElement.classList.add("active");
	}
}

function OpenModalCreateForm() {
	toggleModal("form");
}
function OpenModalAlert(id) {
	toggleModal("alert");
}

document.addEventListener("DOMContentLoaded", () => {
	renderTableData(data);
	renderTopics();
	const searchInput = document.querySelector(".search.input");
	const createForm = document.querySelector("#create_form");

	searchInput.addEventListener("change", (e) => {
		const value = e.target.value.trim().toLowerCase();
		const filterItem = data.filter((i) => {
			const itemName = i.title.toLowerCase();
			return itemName.includes(value);
		});
		renderTableData(filterItem);
	});

	createForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const titleEle = document.getElementById("title");
		const authorEle = document.getElementById("author");
		const selectEle = document.getElementById("topic");

		const selectedValue = selectEle.options[selectEle.selectedIndex].value;

		data.push({
			id: data.length + 1,
			title: titleEle.value,
			author: authorEle.value,
			topic: selectedValue,
		});
		renderTableData(data);

		titleEle.value = "";
		authorEle.value = "";
		selectEle.selectedIndex = 0;

		OpenModalCreateForm();
	});
});
