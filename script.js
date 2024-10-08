const columns = document.querySelectorAll(".column__cards");
const trashBin = document.getElementById("trash-bin");

let draggedCard;

const dragStart = (event) => {
    draggedCard = event.target;
    event.dataTransfer.effectAllowed = 'move';
}

const dragOver = (event) => {
    event.preventDefault();
}

const dragEnter = (event) => {
    if (event.target.classList.contains("column__cards")) {
        event.target.classList.add("column__highlight");
    } else if (event.target.id === "trash-bin") {
        event.target.classList.add("highlight");
    }
}

const dragLeave = (event) => {
    if (event.target.id === "trash-bin") {
        event.target.classList.remove("highlight");
    } else {
        event.target.classList.remove("column__highlight");
    }
}

const drop = (event) => {
    if (event.target.classList.contains("column__cards")) {
        event.target.classList.remove("column__highlight");
        if (draggedCard) {
            event.target.append(draggedCard);
        }
    } else if (event.target.id === "trash-bin") {
        event.target.classList.remove("highlight");
        if (draggedCard) {
            draggedCard.remove();
        }
    }
}

const createCard = (event) => {
    if (!event.target.classList.contains("column__cards")) return;
    const card = document.createElement("section");


    card.className = "card";
    card.draggable = "true";
    card.contentEditable = "true";

    card.addEventListener("focusout", () => {
        card.contentEditable = "false";
        if (!card.textContent.trim()) {
            if (confirm("Você tem certeza que deseja remover este card vazio?")) {
                card.remove();
            } else {
                card.contentEditable = "true";
            }
        }
    });

    card.addEventListener("dblclick", () => {
        card.contentEditable = "true";
        card.focus();
    });

    card.addEventListener("dragstart", dragStart);
    event.target.append(card);
    card.focus();
}

document.addEventListener("dragstart", (event) => {
    if (event.target.classList.contains("card")) {
        dragStart(event);
    }
});

columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);
    column.addEventListener("dblclick", createCard);
});

// Adicionar eventos para a lixeira
trashBin.addEventListener("dragover", dragOver);
trashBin.addEventListener("dragenter", dragEnter);
trashBin.addEventListener("dragleave", dragLeave);
trashBin.addEventListener("drop", drop);

