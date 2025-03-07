const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");

addTaskBtn.addEventListener("click", function () {
    const task = taskInput.value;

    if (task.trim() !== '') {
        const newTask = document.createElement('li');
        newTask.textContent = task;  // Hier war der Fehler (listItem -> newTask)

        taskList.appendChild(newTask);  // Hier auch (task -> newTask)
        taskInput.value = '';
    } else {
        alert("Bitte gebe eine Aufgabe ein.");
    }
});