// Selección de elementos principales del DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');

// Array central para almacenar las tareas
let tasks = [];

// [REQUISITO 5]: Cargar las tareas guardadas al iniciar la aplicación
document.addEventListener('DOMContentLoaded', () => { 
    // CORREGIDO: localStorage (sin la 's' extra)
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks); 
        renderTasks();
    }
});

// [REQUISITO 1 & 2]: Vincula el formulario y añade tareas
taskForm.addEventListener('submit', (e) => { 
   e.preventDefault(); 

   // CORREGIDO: usamos .value para obtener el texto del input
   const taskText = taskInput.value.trim();

   if (taskText !== '') {
       const newTask = {
        id: Date.now(),
        text: taskText
       };
       
       tasks.push(newTask);
       saveToLocalStorage(); 
       renderTasks();

       taskInput.value = ''; 
   }
});

// Función para renderizar el DOM
function renderTasks() {
    taskList.innerHTML = ''; 

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.dataset.id = task.id;

        const span = document.createElement('span');
        // AÑADIDO: Asignamos el texto al span para que sea visible
        span.textContent = task.text; 
        
        // [REQUISITO 3]: Botón de eliminación
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Borrar';
        deleteBtn.classList.add('delete-btn');

        deleteBtn.addEventListener('click', () => {
            deleteTask(task.id);
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    // CORREGIDO: nombre de la función filterTasks
    filterTasks(searchInput.value);
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveToLocalStorage(); 
    renderTasks();
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ==========================================
// [BONUS]: Filtro de búsqueda
// ==========================================
searchInput.addEventListener('input', (e) => {
    // CORREGIDO: nombre de la función filterTasks
    filterTasks(e.target.value);
});

// CORREGIDO: nombre de la función filterTasks
function filterTasks(searchTerm) {
    const term = searchTerm.toLowerCase();
    const items = taskList.querySelectorAll('li');

    items.forEach(item => {
        const span = item.querySelector('span');
        if (span) {
            const text = span.textContent.toLowerCase();
            if (text.includes(term)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        }
    });
}