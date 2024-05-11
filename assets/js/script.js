// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const taskTitle = document.querySelector ("#taskTitle");
const dueDate = document.querySelector("#dueDate");
const taskDescription = document.querySelector("#taskDescription");

//setting up cards for color organization
const pastDue = 'past-due';
const dueSoon = 'due-soon';

//Save changes button from Add task form
saveBtn.addEventListener(`click` , function(event){
    event.preventDefault();
    console.log(taskTitle.value);
    console.log(dueDate.value);
    console.log(taskDescription.value);
    createTaskCard(taskTitle, dueDate, taskDescription);
});

//function for generating a task Id
function generateTaskId() {
    return nextId++;
}

//Task Card
function createTaskCard(taskTitle, dueDate, taskDescription) {
    const nextId = generateTaskId();
    const dueDateTime = new Date(dueDate.value);
    const currentDate = new Date();
    const timeDifference = dueDateTime - currentDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    let cardColorClass = '';

    if (daysDifference < -1) {
        cardColorClass = pastDue;
    } else if (daysDifference >= -1) {
        cardColorClass = dueSoon;
    }

    const cardhtml = 
        `<div id="nextId-${nextId}" class="cardDraggable ${cardColorClass}" w-50">
            <div class="cardHeader ${cardColorClass}">${taskTitle.value}</div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item ${cardColorClass}">${dueDate.value}</li>
                    <li class="list-group-item ${cardColorClass}">${taskDescription.value}</li>
                </ul>
                <a href="#" class="btn btn-primary deleteBtn" data-card-id="nextId-${nextId}">Delete</a>
            </div>
        </div>`;
        $(`#to-do`).append(cardhtml);
        makeCardsDraggable();
};
//Delete task (functionality to delete button)
$(document).on('click', '.deleteBtn', function(event){
    event.preventDefault();
    const cardId = $(this).data('card-id'); 
    const cardElement = $(`#${cardId}`);

    if (cardElement.length) {
        cardElement.remove();  
    }
});

// Drag & Drop functions
$(document).ready(function() {
    makeCardsDraggable();
    makeLanesDroppable();
});

//drag function for task card
function makeCardsDraggable() {
    $(".cardDraggable").draggable({
        containment: ".swim-lanes",
        cursor: "move",
        revert: "invalid",
        zIndex: 100
    });
}
//Drop function to new lanes
function makeLanesDroppable() {
    $(".lane").droppable({
        accept: ".cardDraggable",
        drop: function(event, ui) {
            ui.draggable.detach().appendTo($(this)); 
            ui.draggable.css({ top: 0, left: 0 }); 
        }
    });
}