// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

//Task card 
const taskTitle = document.querySelector ("#taskTitle");
const dueDate = document.querySelector("#dueDate");
const taskDescription = document.querySelector("#taskDescription");

//setting up cards for color organization
const pastDue = 'past-due';
const dueSoon = 'due-soon';

//Save changes button from Add task form
saveBtn.addEventListener(`click` , function(event){
    event.preventDefault();
    createTaskCard(taskTitle.value, dueDate.value, taskDescription.value);
});

//load saved tasks on page load
window.onload = function () {
    loadTasks();
};

//function for generating a task Id
function generateTaskId() {
    return nextId++;
};

//Task Card
function createTaskCard(taskTitle, dueDate, taskDescription) {
    const nextId = generateTaskId();
    const dueDateTime = new Date(dueDate);
    const currentDate = new Date();
    const timeDifference = dueDateTime - currentDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    let cardColorClass = '';

    //determine what is past due (red) and what is due soon (today or future)
    if (daysDifference < -1) {
        cardColorClass = pastDue;
    } else if (daysDifference >= -1) {
        cardColorClass = dueSoon;
    }

    const cardhtml = 
        `<div id="nextId-${nextId}" class="cardDraggable ${cardColorClass}" w-50">
            <div class="cardHeader ${cardColorClass}">${taskTitle}</div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item ${cardColorClass}">${dueDate}</li>
                    <li class="list-group-item ${cardColorClass}">${taskDescription}</li>
                </ul>
                <a href="#" class="btn btn-primary deleteBtn" data-card-id="nextId-${nextId}">Delete</a>
            </div>
        </div>`;
    //append task card to DOM
    $(`#to-do`).append(cardhtml);
    makeCardsDraggable();

     // Add task to taskList
     const task = {
        id: nextId,
        title: taskTitle,
        dueDate: dueDate,
        description: taskDescription,
        colorClass: cardColorClass
    };
    taskList.push(task);

    // Save taskList and nextId to localStorage
    saveTasks(taskList);
};

//saving tasks to local storage
function saveTasks(tasks) {
    localStorage.removeItem("tasks");
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("nextId", nextId);
};

//load tasks from local storage and create new tasks
function loadTasks() {
    taskList = [];
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    savedTasks.forEach(task => {
        createTaskCard(task.title, task.dueDate, task.description, task.colorClass);
    });
};

//Delete task (functionality to delete button)
$(document).on('click', '.deleteBtn', function(event) {
    event.preventDefault();
    const cardId = $(this).data('card-id');
    const id = cardId.split("-").pop();
    // Remove the task from the taskList array
    taskList = taskList.filter(task => task.id !== parseInt(id));
    console.log('Updated taskList after deletion:', taskList);

    // Save the updated taskList to local storage
    saveTasks(taskList);
    console.log('Updated taskList saved to local storage.');

    // Remove the card from the DOM
    $(`#${cardId}`).remove();
    console.log('Card removed from the DOM.');
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
};
//Drop function to new lanes
function makeLanesDroppable() {
    $(".lane").droppable({
        accept: ".cardDraggable",
        drop: function(event, ui) {
            ui.draggable.detach().appendTo($(this)); 
            ui.draggable.css({ top: 0, left: 0 }); 
        }
    });
};
