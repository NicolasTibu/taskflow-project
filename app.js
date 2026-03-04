// 1. Selección de elementos del DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');

// 2. Estado inicial: Cargar de LocalStorage o empezar con array vacío
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// 3. Función para renderizar la lista completa
function renderTasks() {
    taskList.innerHTML = ''; // Limpiamos la lista antes de redibujar

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        // Creamos el contenido con un data-index para saber cuál borrar
        li.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn" data-index="${index}">Eliminar</button>
        `;
        taskList.appendChild(li);
    });

    // Actualizar contador y persistencia
    taskCount.innerText = `${tasks.length} tareas pendientes`;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 4. EVENTO: Añadir Tarea
taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue
    
    const text = taskInput.value.trim();
    if (text !== '') {
        tasks.push(text); // Añadimos al array
        taskInput.value = ''; // Limpiamos input
        renderTasks(); // Dibujamos de nuevo
    }
});

// 5. EVENTO: Borrar Tarea (Delegación de eventos)
// En lugar de onclick en el HTML, escuchamos el clic en la lista
taskList.addEventListener('click', (e) => {
    // Si el elemento clicado tiene la clase 'delete-btn'
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        tasks.splice(index, 1); // Borramos del array
        renderTasks(); // Dibujamos de nuevo
    }
});

// 6. Carga inicial al abrir la página
document.addEventListener('DOMContentLoaded', renderTasks);