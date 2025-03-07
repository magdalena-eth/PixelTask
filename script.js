const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");

addTaskBtn.addEventListener("click", function () {
    const task = taskInput.value;

    if (task.trim() !== '') {
        const newTask = document.createElement('li');

        // Erstelle ein Text-Element für die Aufgabe
        const taskText = document.createElement('span');
        taskText.textContent = task;

        // Durchstreichen per Klick auf den Text
        taskText.addEventListener('click', function () {
            if (taskText.style.textDecoration === 'line-through') {
                taskText.style.textDecoration = 'none';
            } else {
                taskText.style.textDecoration = 'line-through';
            }
        });

        // Füge das taskText zu newTask hinzu
        newTask.appendChild(taskText);

        // Füge die neue Aufgabe zur Liste hinzu
        taskList.appendChild(newTask);

        taskInput.value = ''; // Eingabefeld leeren
    } else {
        alert("Bitte gebe eine Aufgabe ein.");
    }
});
