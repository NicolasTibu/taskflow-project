// 1. Selección de elementos
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');

// Array de tareas (Estado de la aplicación)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// 2. Función para renderizar tareas
function renderTasks() {
    taskList.innerHTML = ''; // Limpiar lista
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">Eliminar</button>
        `;
        taskList.appendChild(li);
    });

    updateCount();
    saveToStorage();
}

// 3. Añadir tarea
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTask = taskInput.value.trim();
    
    if (newTask) {
        tasks.push(newTask);
        taskInput.value = ''; // Limpiar input
        renderTasks();
    }
});

// 4. Eliminar tarea
function deleteTask(index) {
    // Añadimos una pequeña demora lógica si quisiéramos animar la salida
    tasks.splice(index, 1);
    renderTasks();
}

// 5. Persistencia y extras
function saveToStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateCount() {
    taskCount.innerText = `${tasks.length} tareas pendientes`;
}

// 6. Carga inicial
document.addEventListener('DOMContentLoaded', renderTasks);