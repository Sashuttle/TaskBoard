// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const taskTitle = document.querySelector ("#taskTitle");
const dueDate = document.querySelector("#dueDate");
const taskDescription = document.querySelector("#taskDescription");

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
    const cardhtml = 
        `<div id="nextId-${nextId}" class="card draggable" w-50">
            <div class="cardHeader">${taskTitle.value}</div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${dueDate.value}</li>
                    <li class="list-group-item">${taskDescription.value}</li>
                </ul>
                //TODO: make button on card a delete button
                <a href="#" class="btn btn-primary" id="delBtn">Delete</a>
            </div>
        </div>`;
        $(`#to-do`).append(cardhtml);
        makeCardsDraggable();
};

// Todo: create a function to render the task list and make cards draggable
function makeCardsDraggable() {
    $(".draggable").draggable({
        containment: ".swim-lanes",
        cursor: "move",
        revert: true 
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
//function handleDrop(event, ui) {}
function makeLanesDroppable() {
    $(".lane").droppable({
        accept: ".draggable",
        drop: function(event, ui) {
            ui.draggable.detach().appendTo($(this));
        }
    });
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
//$(document).ready(function () {});
$(document).ready(function() {
    renderTaskList(); // Make sure this function actually renders tasks if any exist initially
    makeLanesDroppable();
    $('#saveBtn').on('click', function() {
        createTaskCard(taskTitle, dueDate, taskDescription);
        $('#formModal').modal('hide'); // This will hide the modal after submitting
    });
});