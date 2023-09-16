document.addEventListener("DOMContentLoaded", function () {
    const addItemBtn = document.getElementById("addItemBtn");
    const itemNameInput = document.getElementById("itemName");
    const itemDescriptionInput = document.getElementById("itemDescription");
    const itemTopicInput = document.getElementById("itemTopic");
    const itemList = document.getElementById("itemList");

    addItemBtn.addEventListener("click", function() {
        const itemName = itemNameInput.value;
        const itemDescription = itemDescriptionInput.value;
        const itemTopic = itemTopicInput.value;

        if (itemName.trim() !== "") {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                 <td>${itemName}</td>
                 <td>${itemDescription}</td>
                 <td>${itemTopic}</td>
                 <td><button class="delete-btn">Delete</button></td>
            `;

            itemList.appendChild(newRow);

            itemNameInput.value = "";
            itemDescriptionInput.value = "";
        
            const deleteButton = newRow.querySelector(".delete-btn");
            deleteButton.addEventListener("click", function () {
                const confirmationModal = document.getElementById("confirmationModal");
                confirmationModal.style.display = "block";

                const confirmDeleteButton = document.getElementById("confirmDelete");
                confirmDeleteButton.addEventListener("click", function () {
                    newRow.remove();
                    confirmationModal.style.display = "none";
                });
            });

            const closeButtons = document.getElementsByClassName("close");
            for (const closeButton of closeButtons) {
                closeButton.addEventListener("click", function () {
                    confirmationModal.style.display = "none"; // Close the modal
                });
            }
        }
    });
});