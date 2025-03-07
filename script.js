// 📌 Aktuelles Datum in der Top-Leiste setzen
const currentDateElm = document.getElementById('currentDate');
const today = new Date();
const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
currentDateElm.textContent = today.toLocaleDateString('de-DE', options);

// 📌 Elemente aus dem DOM abrufen
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");
const prioritySelect = document.getElementById("prioritySelect");

// 📌 Funktion zum Hinzufügen einer Aufgabe
function addTask() {
    const task = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (task !== '') {
        const newTask = document.createElement('li');
        newTask.classList.add(`${priority}-priority`);
        newTask.setAttribute('data-priority', priority); // Priorität für Sortierung speichern

        // 📝 Erstellungszeit hinzufügen
        const creationTime = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
        const timeSpan = document.createElement('span');
        timeSpan.textContent = `(${creationTime}) `;
        timeSpan.style.marginRight = '10px';
        timeSpan.style.fontSize = 'small';

        // 📌 Aufgabe-Text
        const taskText = document.createElement('span');
        taskText.textContent = task;

        // ✅ Durchstreichen per Klick
        taskText.addEventListener('click', () => {
            taskText.style.textDecoration = taskText.style.textDecoration === 'line-through' ? 'none' : 'line-through';
        });

        // ❌ Löschen-Button
        const deleteTaskBtn = document.createElement('button');
        deleteTaskBtn.textContent = 'X';
        deleteTaskBtn.addEventListener('click', () => taskList.removeChild(newTask));

        // 🔗 Elemente zusammenfügen
        newTask.appendChild(timeSpan);
        newTask.appendChild(taskText);
        newTask.appendChild(deleteTaskBtn);
        taskList.appendChild(newTask);

        // 📌 Aufgaben sortieren nach Priorität
        sortTasks();

        // 🔄 Eingabe zurücksetzen
        taskInput.value = '';
    } else {
        alert("Bitte gebe eine Aufgabe ein.");
    }
}

// 📌 Sortierfunktion nach Priorität
function sortTasks() {
    const tasks = Array.from(taskList.children);
    const priorityOrder = ['high', 'medium', 'low'];

    tasks.sort((a, b) => {
        const priorityA = a.getAttribute('data-priority');
        const priorityB = b.getAttribute('data-priority');
        return priorityOrder.indexOf(priorityA) - priorityOrder.indexOf(priorityB);
    });

    tasks.forEach(task => taskList.appendChild(task));
}

// 📌 Event Listener für "Enter"-Taste
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// 📌 Event Listener für den "Hinzufügen"-Button
addTaskBtn.addEventListener("click", addTask);
