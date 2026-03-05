// --- CONFIGURACIÓN Y ESTADO ---
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const moodIcon = document.getElementById('mood-icon');
const clearAllBtn = document.getElementById('clear-all-btn');
const searchInput = document.getElementById('search-input');

// Elementos de Sonido
const sndAdd = document.getElementById('sound-add');
const sndDelete = document.getElementById('sound-delete');

// --- LÓGICA MODO OSCURO (Punto 4) ---
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Carga inicial de tema
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    themeIcon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
    localStorage.theme = isDark ? 'dark' : 'light';
});

// Estado de las tareas
let tasks = JSON.parse(localStorage.getItem('tasks_tailwind_v3')) || [];

// --- FUNCIONES AUXILIARES ---

function updateUI() {
    localStorage.setItem('tasks_tailwind_v3', JSON.stringify(tasks));
    renderTasks();
    updateMood();
}

function playSound(audioEl) {
    audioEl.currentTime = 0;
    // audioEl.play().catch(()=>{}); // Descomentar para activar sonido
}

function updateMood() {
    // Usando clases de Tailwind para el indicador de ánimo
    moodIcon.className = 'w-6 h-6 rounded-full transition-all duration-500 shadow-md';
    if (tasks.length === 0) {
        moodIcon.classList.add('bg-slate-400', 'shadow-slate-400/50');
    } else if (tasks.length > 5) {
        moodIcon.classList.add('bg-orange-400', 'shadow-orange-400/50', 'animate-pulse');
    } else {
        moodIcon.classList.add('bg-emerald-400', 'shadow-emerald-400/50');
    }

    // Toggle del botón "Limpiar todo"
    if (tasks.length > 1) {
        clearAllBtn.classList.remove('hidden');
    } else {
        clearAllBtn.classList.add('hidden');
    }
}

// Toast con Tailwind CSS
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    const colorClass = type === 'success' ? 'border-emerald-500' : 'border-red-500';
    const icon = type === 'success' ? 'fa-check-circle text-emerald-500' : 'fa-trash-alt text-red-500';

    toast.className = `bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-5 py-3 rounded-xl shadow-2xl border-l-4 ${colorClass} flex items-center gap-3 transform transition-all duration-300 translate-x-full opacity-0`;
    toast.innerHTML = `<i class="fas ${icon}"></i> <span class="text-sm font-medium">${message}</span>`;
    
    container.appendChild(toast);

    // Entrada suave
    setTimeout(() => toast.classList.remove('translate-x-full', 'opacity-0'), 10);

    // Salida y eliminación
    setTimeout(() => {
        toast.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- RENDERIZADO (Punto 2 y 5) ---

function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-slate-400 dark:text-slate-600 transition-all">
                <i class="fas fa-feather text-5xl mb-4 opacity-20"></i>
                <p class="font-medium">Tu lista está vacía</p>
            </div>`;
        taskCount.innerText = "0 tareas restantes";
        return;
    }

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.dataset.index = index;
        
        // Clases de Tailwind para el Item (Bonus: Hovers y transiciones)
        li.className = `task-item group flex justify-between items-center p-4 bg-white/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-lg transition-all duration-300 ${task.completed ? 'opacity-50' : ''}`;

        li.innerHTML = `
            <span class="task-text flex-1 text-slate-700 dark:text-slate-200 transition-all duration-300 cursor-pointer ${task.completed ? 'line-through opacity-50' : 'font-medium'}">
                ${task.text}
            </span>
            <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button class="check-btn p-2 hover:bg-emerald-100 dark:hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-500 rounded-lg transition-all">
                    <i class="fas fa-check"></i>
                </button>
                <button class="delete-btn p-2 hover:bg-red-100 dark:hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-all">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        
        taskList.appendChild(li);
    });

    taskCount.innerText = `${tasks.filter(t => !t.completed).length} tareas restantes`;
}

// --- EVENTOS ---

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        searchInput.value = '';
        taskInput.focus();
        playSound(sndAdd);
        showToast('Tarea añadida');
        updateUI();
    }
});

taskList.addEventListener('click', (e) => {
    const target = e.target;
    const li = target.closest('.task-item');
    if (!li) return;
    const index = li.dataset.index;

    // Acción Check
    if (target.closest('.check-btn') || target.classList.contains('task-text')) {
        tasks[index].completed = !tasks[index].completed;
        updateUI();
        return;
    }

    // Acción Eliminar con Animación
    if (target.closest('.delete-btn')) {
        playSound(sndDelete);
        li.classList.add('scale-95', 'opacity-0', '-translate-x-10');
        setTimeout(() => {
            tasks.splice(index, 1);
            showToast('Tarea eliminada', 'delete');
            updateUI();
        }, 200);
    }
});

clearAllBtn.addEventListener('click', () => {
    if(tasks.length > 0 && confirm('¿Borrar todas las tareas?')) {
        tasks = [];
        showToast('Todo despejado', 'delete');
        updateUI();
    }
});

// Búsqueda en tiempo real
searchInput.addEventListener('keyup', () => {
    const term = searchInput.value.toLowerCase().trim();
    const listItems = document.querySelectorAll('.task-item');

    listItems.forEach(item => {
        const text = item.querySelector('.task-text').innerText.toLowerCase();
        item.classList.toggle('filtered', !text.includes(term));
    });
});

document.addEventListener('DOMContentLoaded', updateUI);