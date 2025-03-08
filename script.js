// Aktuelles Datum in der Top-Leiste setzen
document.addEventListener("DOMContentLoaded", () => {
    const currentDateElm = document.getElementById('currentDate');
    const today = new Date();
    const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
    currentDateElm.textContent = today.toLocaleDateString('de-DE', options);

    // Aufgaben aus Local Storage laden
    loadTasks();
});

// Elemente aus dem DOM abrufen
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");
const prioritySelect = document.getElementById("prioritySelect");

// Funktion zum Hinzufügen einer Aufgabe
function addTask() {
    const task = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (task !== '') {
        const taskData = {
            text: task,
            priority: priority,
            timestamp: new Date().toISOString()
        };

        saveTask(taskData);
        renderTask(taskData);
        sortTasks();

        // Eingabe zurücksetzen
        taskInput.value = '';
    } else {
        alert("Bitte gebe eine Aufgabe ein.");
    }
}

// Aufgabe im Local Storage speichern
function saveTask(taskData) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskData);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Aufgabe auf der Seite anzeigen
function renderTask(taskData) {
    const newTask = document.createElement("li");
    newTask.classList.add(`${taskData.priority}-priority`);
    newTask.setAttribute('data-priority', taskData.priority);

    // Erstellungszeit anzeigen
    const timeSpan = document.createElement("span");
    const creationTime = new Date(taskData.timestamp).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    timeSpan.textContent = `(${creationTime}) `;
    timeSpan.style.marginRight = '10px';
    timeSpan.style.fontSize = 'small';

    // Aufgabe-Text
    const taskText = document.createElement('span');
    taskText.textContent = taskData.text;

    // Durchstreichen per Klick
    taskText.addEventListener('click', () => {
        taskText.style.textDecoration = taskText.style.textDecoration === 'line-through' ? 'none' : 'line-through';
    });

    // Löschen-Button
    const deleteTaskBtn = document.createElement('button');
    deleteTaskBtn.textContent = 'X';
    deleteTaskBtn.addEventListener('click', () => deleteTask(taskData, newTask));

    // Elemente zusammenfügen
    newTask.appendChild(timeSpan);
    newTask.appendChild(taskText);
    newTask.appendChild(deleteTaskBtn);
    taskList.appendChild(newTask);
}

// Aufgaben aus Local Storage laden
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = ''; // Liste leeren, um doppelte Einträge zu vermeiden
    tasks.forEach(renderTask);
    sortTasks();
}

// Aufgabe aus Local Storage und Liste löschen
function deleteTask(taskData, taskElement) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskData.text || task.timestamp !== taskData.timestamp);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskElement.remove();
}

// Aufgaben nach Priorität sortieren
function sortTasks() {
    const tasks = Array.from(taskList.children);
    const priorityOrder = ['high', 'medium', 'low'];

    tasks.sort((a, b) => {
        return priorityOrder.indexOf(a.getAttribute('data-priority')) - priorityOrder.indexOf(b.getAttribute('data-priority'));
    });

    tasks.forEach(task => taskList.appendChild(task));
}

// Event Listener für "Enter"-Taste
taskInput.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Event Listener für den "Hinzufügen"-Button
addTaskBtn.addEventListener("click", addTask);
