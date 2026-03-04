// Selección de elementos principales del DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');

// Array central para almacenar las tareas
let tasks = [];

// [REQUISITO 5]: Cargar las tareas guardadas al iniciar la aplicación
document.addEventListener('DOMContentLoaded', () => { 
    const storedTasks = loscalStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks); // Covertir de texto JSON a array de JS
        renderTasks();
    }
});

// [REQUISITO 1 & 2]: Vincula el formulario y añade tareas
taskForm.addEventListener('submit', (e) => { 
   e.preventDefault(); // Evita que la página se recargue al hacer submit

   const taskText = taskInput.ariaValueMax.trim();

   if (taskText !== '') {
       // Crear un objeto tarea con un ID único 
       const newTask = {
        id: Date.now(),
        text: taskText
       };
       
       tasks.push(newTask);
       saveToLocalStorage(); // [REQUISITO 4]
       renderTasks();

       taskInput.value = ''; // Limpiar el input
   }
});

// Función para renderizar el DOM (Dibuja la lista en pantalla)
function renderTasks() {
    taskList.innerHTML = ''; // Limpiar la lista actual antes de re-dibujar

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.dataset.id = task.id;

        const span = document.createElement('span')
        
        // [REQUISITO 3]: Añade un botón de eliminación a cada tarea
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Borrar'
        deleteBtn.classList.add('delete-btn');

        deleteBtn.addEventListener('click', () => {
            deleteTask(task.id);
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    // Si hay texto en el buscador, lo aplicamos al re-dibujar
    fliterTasks(searchInput.value);
}

// Función para borrar del array y actualizar el DOM
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveToLocalStorage(); // [REQUISITO 4]
    renderTasks();
}

// [REQUISITO 4]: Guarda el array de tareas en LocalStorage usando JSON.stringify
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ==========================================
// [BONUS]: Filtro de búsqueda
// ==========================================
searchInput.addEventListener('input', (e) => {
    fliterTasks(e.target.value);
});

function fliterTasks(searchTerm) {
    const term = searchTerm.toLowerCase();
    const items = taskList.querySelectorAll('li');

    items.forEach(item => {
        const text = item.querySelector('span').textContent.toLowerCase();
        // Si el texto de la tarea incluye lo que buscamos, lo mostramos, si no, añadimos la clase .hidden
        if (text.includes(term)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }    
    });
}