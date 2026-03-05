// --- CONFIGURACIÓN Y ESTADO ---
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskDateInput = document.getElementById('task-date');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const moodIcon = document.getElementById('mood-icon');
const clearAllBtn = document.getElementById('clear-all-btn');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');

// Elementos de Emoji
const emojiBtn = document.getElementById('emoji-btn');
const emojiPicker = document.getElementById('emoji-picker');
const emojiOptions = document.querySelectorAll('.emoji-opt');

const sndAdd = document.getElementById('sound-add');
const sndDelete = document.getElementById('sound-delete');

// --- LÓGICA MODO OSCURO ---
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

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

// Estado
let tasks = JSON.parse(localStorage.getItem('tasks_tailwind_v5')) || [];
let currentFilter = 'all';

// --- LÓGICA DE EMOJIS ---

// Abrir/Cerrar selector
emojiBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    emojiPicker.classList.toggle('hidden');
});

// Insertar emoji en el input
emojiOptions.forEach(opt => {
    opt.addEventListener('click', () => {
        taskInput.value = opt.innerText + " " + taskInput.value;
        emojiPicker.classList.add('hidden');
        taskInput.focus();
    });
});

// Cerrar selector al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!emojiPicker.contains(e.target) && !emojiBtn.contains(e.target)) {
        emojiPicker.classList.add('hidden');
    }
});

// --- FUNCIONES AUXILIARES ---

function updateUI() {
    // Ordenar: Incompletas primero y por fecha
    tasks.sort((a, b) => {
        if (a.completed !== b.completed) return a.completed - b.completed;
        if (a.date && b.date) return new Date(a.date) - new Date(b.date);
        return a.date ? -1 : 1;
    });

    localStorage.setItem('tasks_tailwind_v5', JSON.stringify(tasks));
    renderTasks();
    updateMood();
}

function playSound(audioEl) {
    audioEl.currentTime = 0;
    // audioEl.play().catch(()=>{}); 
}

function updateMood() {
    moodIcon.className = 'w-6 h-6 rounded-full transition-all duration-500 shadow-md';
    const pending = tasks.filter(t => !t.completed).length;
    
    if (pending === 0) {
        moodIcon.classList.add('bg-emerald-400', 'shadow-emerald-400/50');
    } else if (pending > 5) {
        moodIcon.classList.add('bg-orange-400', 'shadow-orange-400/50', 'animate-pulse');
    } else {
        moodIcon.classList.add('bg-primary-400', 'shadow-primary-400/50');
    }
    clearAllBtn.classList.toggle('hidden', tasks.length <= 1);
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    const colorClass = type === 'success' ? 'border-emerald-500' : 'border-red-500';
    const icon = type === 'success' ? 'fa-check-circle text-emerald-500' : 'fa-trash-alt text-red-500';

    toast.className = `bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-5 py-3 rounded-xl shadow-2xl border-l-4 ${colorClass} flex items-center gap-3 transform transition-all duration-300 translate-x-full opacity-0`;
    toast.innerHTML = `<i class="fas ${icon}"></i> <span class="text-sm font-medium">${message}</span>`;
    
    container.appendChild(toast);
    setTimeout(() => toast.classList.remove('translate-x-full', 'opacity-0'), 10);
    setTimeout(() => {
        toast.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- LÓGICA DE FILTROS ---
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
            b.classList.remove('bg-white', 'dark:bg-slate-800', 'shadow-sm', 'text-primary-500');
            b.classList.add('text-slate-500');
        });
        btn.classList.add('bg-white', 'dark:bg-slate-800', 'shadow-sm', 'text-primary-500');
        btn.classList.remove('text-slate-500');
        
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

// --- RENDERIZADO ---

function renderTasks() {
    taskList.innerHTML = '';
    const today = new Date().toISOString().split('T')[0];

    let filteredTasks = tasks;
    if (currentFilter === 'today') {
        filteredTasks = tasks.filter(t => t.date === today);
    } else if (currentFilter === 'week') {
        const weekAway = new Date();
        weekAway.setDate(weekAway.getDate() + 7);
        const weekAwayStr = weekAway.toISOString().split('T')[0];
        filteredTasks = tasks.filter(t => t.date >= today && t.date <= weekAwayStr);
    }

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `<div class="flex flex-col items-center justify-center py-10 text-slate-400 dark:text-slate-600 italic text-xs"><p>Sin misiones aquí</p></div>`;
        taskCount.innerText = "0 tareas pendientes";
        return;
    }

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.dataset.index = index;
        
        const isOverdue = task.date && task.date < today && !task.completed;
        const dateDisplay = task.date ? new Date(task.date + "T00:00:00").toLocaleDateString('es-ES', {day:'numeric', month:'short'}) : null;

        li.className = `task-item group flex justify-between items-center p-4 bg-white/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-primary-400 transition-all duration-300 ${task.completed ? 'opacity-50' : ''}`;

        li.innerHTML = `
            <div class="flex flex-col flex-1 cursor-pointer pr-4">
                <span class="task-text text-slate-700 dark:text-slate-200 transition-all ${task.completed ? 'line-through opacity-50' : 'font-medium'}">
                    ${task.text}
                </span>
                ${task.date ? `
                    <span class="text-[10px] mt-1 flex items-center gap-1 ${isOverdue ? 'text-red-500 font-bold animate-pulse' : 'text-slate-400'}">
                        <i class="far fa-calendar-alt"></i> ${dateDisplay} ${isOverdue ? '(Atrasada)' : ''}
                    </span>
                ` : ''}
            </div>
            <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button class="check-btn p-2 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-500 rounded-lg transition-all"><i class="fas fa-check"></i></button>
                <button class="delete-btn p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-all"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
        taskList.appendChild(li);
    });

    taskCount.innerText = `${tasks.filter(t => !t.completed).length} misiones pendientes`;
}

// --- EVENTOS ---

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    const date = taskDateInput.value;

    if (text) {
        tasks.push({ text, completed: false, date });
        taskInput.value = '';
        taskDateInput.value = '';
        taskInput.focus();
        playSound(sndAdd);
        showToast('¡Tarea decorada y guardada!');
        updateUI();
    }
});

taskList.addEventListener('click', (e) => {
    const target = e.target;
    const li = target.closest('.task-item');
    if (!li) return;
    
    // Obtenemos el texto para encontrar el índice real en el array original (por si hay filtros activos)
    const taskText = li.querySelector('.task-text').innerText;
    const index = tasks.findIndex(t => t.text === taskText);

    if (target.closest('.check-btn') || target.classList.contains('task-text')) {
        tasks[index].completed = !tasks[index].completed;
        updateUI();
        return;
    }

    if (target.closest('.delete-btn')) {
        playSound(sndDelete);
        li.classList.add('scale-95', 'opacity-0', '-translate-x-10');
        setTimeout(() => {
            tasks.splice(index, 1);
            showToast('Misión eliminada', 'delete');
            updateUI();
        }, 200);
    }
});

clearAllBtn.addEventListener('click', () => {
    if(tasks.length > 0 && confirm('¿Quieres resetear todo tu tablero?')) {
        tasks = [];
        showToast('Tablero limpio', 'delete');
        updateUI();
    }
});

searchInput.addEventListener('keyup', () => {
    const term = searchInput.value.toLowerCase().trim();
    document.querySelectorAll('.task-item').forEach(item => {
        const text = item.querySelector('.task-text').innerText.toLowerCase();
        item.classList.toggle('filtered', !text.includes(term));
    });
});

document.addEventListener('DOMContentLoaded', updateUI);