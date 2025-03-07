const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");

function addTask() {
    const task = taskInput.value;

    if (task.trim() !== '') {
        const newTask = document.createElement('li');

        // Aufgabe-Text
        const taskText = document.createElement('span');
        taskText.textContent = task;

        // Durchstreichen per Klick
        taskText.addEventListener('click', function () {
            if (taskText.style.textDecoration === 'line-through') {
                taskText.style.textDecoration = 'none';
            } else {
                taskText.style.textDecoration = 'line-through';
            }
        });

        const deleteTaskBtn = document.createElement('button');
        deleteTaskBtn.textContent = 'X';
        deleteTaskBtn.addEventListener('click', function () {
            taskList.removeChild(newTask);
        });

        newTask.appendChild(taskText);
        newTask.appendChild(deleteTaskBtn);
        taskList.appendChild(newTask);

        taskInput.value = '';
    } else {
        alert("Bitte gebe eine Aufgabe ein.");
    }
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
