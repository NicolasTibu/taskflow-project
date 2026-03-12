// --- CONFIGURACIÓN Y ESTADO ---
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const moodIcon = document.getElementById('mood-icon');
const clearAllBtn = document.getElementById('clear-all-btn');
const searchInput = document.getElementById('search-input');
const emojiBtn = document.getElementById('emoji-btn');
const emojiPicker = document.getElementById('emoji-picker');
const prioritySelect = document.getElementById('priority-select');
const taskDateInput = document.getElementById('task-date');
const sortSelect = document.getElementById('sort-select');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const sndAdd = document.getElementById('sound-add');
const sndDelete = document.getElementById('sound-delete');

// Estado: Array de tareas { text, completed, emoji?, priority?, dueDate? }
let tasks = JSON.parse(localStorage.getItem('tasks_v2')) || [];
let currentFilter = 'all';
let currentSort = 'recent';
let selectedEmoji = '';

// Normalizar tareas antiguas (backward compatibility)
tasks = tasks.map(t => ({
    text: t.text,
    completed: !!t.completed,
    emoji: t.emoji || '',
    priority: t.priority || 'medium',
    dueDate: t.dueDate || null
}));

// --- FUNCIONES AUXILIARES ---

function updateUI() {
    localStorage.setItem('tasks_v2', JSON.stringify(tasks));
    renderTasks();
    updateMood();
}

function playSound(audioEl) {
    audioEl.currentTime = 0;
}

function updateMood() {
    moodIcon.className = '';
    if (tasks.length === 0) moodIcon.classList.add('mood-neutral');
    else if (tasks.length > 5) moodIcon.classList.add('mood-busy');
    else moodIcon.classList.add('mood-happy');

    clearAllBtn.classList.toggle('hide', tasks.length <= 1);
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-trash'}"></i> ${message}`;
    document.getElementById('toast-container').appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function formatDueDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDay = new Date(d);
    taskDay.setHours(0, 0, 0, 0);
    const diff = Math.ceil((taskDay - today) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Hoy';
    if (diff === 1) return 'Mañana';
    if (diff === -1) return 'Ayer';
    if (diff > 1 && diff <= 7) return `En ${diff} días`;
    if (diff < -1 && diff >= -7) return `Hace ${-diff} días`;
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

function isOverdue(dateStr) {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today && !tasks.find(t => t.dueDate === dateStr && t.completed);
}

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

function getFilteredTasks() {
    let list = [...tasks];
    const term = searchInput.value.toLowerCase().trim();
    if (term) list = list.filter(t => (t.emoji + ' ' + t.text).toLowerCase().includes(term));
    if (currentFilter === 'pending') list = list.filter(t => !t.completed);
    if (currentFilter === 'completed') list = list.filter(t => t.completed);

    // Ordenación
    const sortVal = sortSelect ? sortSelect.value : currentSort;
    if (sortVal === 'priority') {
        list.sort((a, b) => (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1));
    } else if (sortVal === 'date') {
        list.sort((a, b) => {
            const da = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
            const db = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
            return da - db;
        });
    } else if (sortVal === 'text') {
        list.sort((a, b) => (a.emoji + a.text).localeCompare(b.emoji + b.text));
    } else if (sortVal === 'pending') {
        list.sort((a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0));
    } else {
        list.reverse();
    }
    return list;
}

// --- RENDER ---

function renderTasks() {
    const filtered = getFilteredTasks();
    taskList.innerHTML = '';

    if (filtered.length === 0) {
        const empty = document.createElement('li');
        empty.className = 'empty-state';
        empty.innerHTML = `<i class="fas fa-feather"></i><p>${currentFilter === 'completed' ? 'Sin tareas completadas' : currentFilter === 'pending' ? '¡Todo al día!' : tasks.length === 0 ? 'Todo limpio. ¡Disfruta tu día!' : 'No hay resultados'}</p>`;
        Object.assign(empty.style, { textAlign: 'center', color: 'var(--text-muted)', paddingTop: '30px', listStyle: 'none' });
        empty.querySelector('i').style.fontSize = '2rem';
        empty.querySelector('i').style.marginBottom = '10px';
        taskList.appendChild(empty);
    } else {
        filtered.forEach((task, displayIndex) => {
            const index = tasks.indexOf(task);
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.dataset.index = index;

            const content = document.createElement('div');
            content.className = 'task-content';
            content.innerHTML = `
                <span class="priority-dot ${task.priority}"></span>
                <span class="task-text">${task.emoji ? task.emoji + ' ' : ''}${escapeHtml(task.text)}</span>
                <input type="text" class="task-edit-input" value="${escapeHtml(task.text)}" maxlength="80">
                ${task.dueDate ? `<span class="task-date-badge ${isOverdue(task.dueDate) && !task.completed ? 'overdue' : ''}">${formatDueDate(task.dueDate)}</span>` : ''}
            `;

            const actions = document.createElement('div');
            actions.className = 'action-btns';
            actions.innerHTML = `
                <button class="icon-btn edit-btn" title="Editar"><i class="fas fa-pen"></i></button>
                <button class="icon-btn check-btn"><i class="fas fa-check"></i></button>
                <button class="icon-btn delete-btn"><i class="fas fa-trash-alt"></i></button>
            `;

            li.appendChild(content);
            li.appendChild(actions);
            taskList.appendChild(li);
        });
    }

    const pending = tasks.filter(t => !t.completed).length;
    taskCount.innerText = `${pending} tarea${pending !== 1 ? 's' : ''} pendiente${pending !== 1 ? 's' : ''}`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// --- EVENTOS ---

// Añadir tarea
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;

    const task = {
        text,
        completed: false,
        emoji: selectedEmoji,
        priority: prioritySelect.value,
        dueDate: taskDateInput.value || null
    };
    tasks.push(task);
    taskInput.value = '';
    searchInput.value = '';
    selectedEmoji = '';
    taskDateInput.value = '';
    prioritySelect.value = 'medium';
    taskInput.focus();

    playSound(sndAdd);
    showToast('Tarea añadida');
    updateUI();
});

// Emoji picker
emojiBtn.addEventListener('click', () => {
    emojiPicker.classList.toggle('hidden');
});

document.querySelectorAll('.emoji-opt').forEach(btn => {
    btn.addEventListener('click', (e) => {
        selectedEmoji = e.target.textContent;
        emojiPicker.classList.add('hidden');
        emojiBtn.textContent = selectedEmoji || '✨';
        if (!selectedEmoji) emojiBtn.textContent = '✨';
    });
});

// Delegación en lista
taskList.addEventListener('click', (e) => {
    const li = e.target.closest('.task-item');
    if (!li || li.classList.contains('empty-state')) return;
    const index = parseInt(li.dataset.index, 10);
    const task = tasks[index];
    if (!task) return;

    if (e.target.closest('.edit-btn')) {
        li.classList.add('editing');
        const input = li.querySelector('.task-edit-input');
        input.style.display = 'block';
        input.focus();
        input.select();
        return;
    }

    if (e.target.closest('.check-btn') || e.target.closest('.task-text')) {
        task.completed = !task.completed;
        updateUI();
        return;
    }

    if (e.target.closest('.delete-btn')) {
        playSound(sndDelete);
        li.classList.add('fall-out');
        li.addEventListener('animationend', () => {
            tasks.splice(index, 1);
            showToast('Tarea eliminada', 'delete');
            updateUI();
        }, { once: true });
    }
});

// Editar: guardar al perder foco o Enter
taskList.addEventListener('blur', (e) => {
    const input = e.target;
    if (input.classList.contains('task-edit-input')) {
        const li = input.closest('.task-item');
        const index = parseInt(li.dataset.index, 10);
        const newText = input.value.trim();
        if (newText && tasks[index]) {
            tasks[index].text = newText;
            updateUI();
        }
        li.classList.remove('editing');
    }
}, true);

taskList.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('task-edit-input') && e.key === 'Enter') {
        e.target.blur();
    }
});

// Doble clic en texto para editar
taskList.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('task-text')) {
        const li = e.target.closest('.task-item');
        const editBtn = li?.querySelector('.edit-btn');
        if (editBtn) editBtn.click();
    }
});

// Filtros
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

// Ordenación
if (sortSelect) {
    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        renderTasks();
    });
}

// Limpiar todo
clearAllBtn.addEventListener('click', () => {
    if (tasks.length > 0 && confirm('¿Borrar TODAS las tareas?')) {
        tasks = [];
        showToast('Lista limpia', 'delete');
        updateUI();
    }
});

// Búsqueda
searchInput.addEventListener('keyup', () => {
    renderTasks();
});

// --- Tema claro/oscuro ---
function aplicarTema(esClaro) {
    if (esClaro) {
        document.body.classList.add('theme-light');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
        localStorage.setItem('taskflow_theme', 'light');
    } else {
        document.body.classList.remove('theme-light');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
        localStorage.setItem('taskflow_theme', 'dark');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const esClaro = document.body.classList.contains('theme-light');
        aplicarTema(!esClaro);
    });
}

// --- INICIO ---
document.addEventListener('DOMContentLoaded', () => {
    const temaGuardado = localStorage.getItem('taskflow_theme');
    if (temaGuardado === 'light') aplicarTema(true);
    updateUI();
});
