// --- CONFIGURACIÓN Y ESTADO ---
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const moodIcon = document.getElementById('mood-icon');
const clearAllBtn = document.getElementById('clear-all-btn');

// Elementos de Sonido
const sndAdd = document.getElementById('sound-add');
const sndDelete = document.getElementById('sound-delete');

// Estado: Array de objetos para manejar 'completado' y texto
let tasks = JSON.parse(localStorage.getItem('tasks_v2')) || [];

// --- FUNCIONES AUXILIARES DE INTERACTIVIDAD ---

// 1. Guardar y Actualizar Interfaz Completa
function updateUI() {
    localStorage.setItem('tasks_v2', JSON.stringify(tasks));
    renderTasks();
    updateMood();
}

// 2. Feedback Sonoro (opcional, necesita interacción previa del usuario)
function playSound(audioEl) {
    audioEl.currentTime = 0; // Reinicia para clics rápidos
    // audioEl.play().catch(()=>{}); // Descomentar para activar sonido
}

// 3. Cambiar icono de ánimo según carga de trabajo (Feedback visual pasivo)
function updateMood() {
    moodIcon.className = ''; // Limpiar clases
    if (tasks.length === 0) {
        moodIcon.classList.add('mood-neutral');
    } else if (tasks.length > 5) {
        moodIcon.classList.add('mood-busy');
    } else {
        moodIcon.classList.add('mood-happy');
    }

    // Mostrar/ocultar botón de limpiar todo
    if (tasks.length > 1) {
        clearAllBtn.classList.remove('hide');
    } else {
        clearAllBtn.classList.add('hide');
    }
}

// 4. Sistema de Notificaciones Toast (Interactividad de Feedback)
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-trash'}"></i> ${message}`;
    document.getElementById('toast-container').appendChild(toast);
    
    // Eliminar del DOM después de la animación
    setTimeout(() => toast.remove(), 3000);
}


// --- LÓGICA PRINCIPAL DEL DOM ---

// 5. Renderizado con creación dinámica de nodos (más seguro y permite animaciones)
function renderTasks() {
    taskList.innerHTML = ''; // Limpiar vista

    if (tasks.length === 0) {
        taskList.innerHTML = `<li class="empty-state"><i class="fas fa-feather"></i><p>Todo limpio. ¡Disfruta tu día!</p></li>`;
        // Estilo rápido para el estado vacío
        const es = taskList.querySelector('.empty-state');
        Object.assign(es.style, {textAlign:'center', color:'var(--text-muted)', paddingTop:'30px', listStyle:'none'});
        es.querySelector('i').style.fontSize = '2rem';
        es.querySelector('i').style.marginBottom = '10px';
    }

    tasks.forEach((task, index) => {
        // Crear elemento LI
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.index = index; // Guardar índice

        // Crear Texto
        const spanText = document.createElement('span');
        spanText.className = 'task-text';
        spanText.innerText = task.text;

        // Crear Contenedor de Botones
        const divActions = document.createElement('div');
        divActions.className = 'action-btns';

        // Botón Check
        const btnCheck = document.createElement('button');
        btnCheck.className = 'icon-btn check-btn';
        btnCheck.innerHTML = '<i class="fas fa-check"></i>';
        
        // Botón Eliminar
        const btnDelete = document.createElement('button');
        btnDelete.className = 'icon-btn delete-btn';
        btnDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';

        // Ensamblar
        divActions.appendChild(btnCheck);
        divActions.appendChild(btnDelete);
        li.appendChild(spanText);
        li.appendChild(divActions);
        
        // Inyectar en UL
        taskList.appendChild(li);
    });

    taskCount.innerText = `${tasks.filter(t => !t.completed).length} tareas restantes`;
}


// --- GESTIÓN DE EVENTOS ---

// 6. EVENTO: Añadir Tarea
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    
    if (text) {
        // Añadir objeto complejo
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        taskInput.focus();
        
        playSound(sndAdd);
        showToast('Tarea añadida con éxito');
        updateUI();
    }
});

// 7. EVENTO: Delegación de Eventos en la Lista (Check y Delete con Animación)
taskList.addEventListener('click', (e) => {
    const target = e.target;
    // Encontrar el LI padre más cercano
    const li = target.closest('.task-item');
    if (!li || li.classList.contains('empty-state')) return;
    const index = li.dataset.index;

    // Lógica botón Check
    if (target.closest('.check-btn')) {
        tasks[index].completed = !tasks[index].completed;
        updateUI();
        return;
    }

    // Lógica botón Eliminar con ANIMACIÓN
    if (target.closest('.delete-btn')) {
        playSound(sndDelete);
        
        // 1. Aplicar clase de animación de salida
        li.classList.add('fall-out');
        
        // 2. Esperar a que termine la animación (0.4s en CSS)
        li.addEventListener('animationend', () => {
            tasks.splice(index, 1);
            showToast('Tarea eliminada', 'delete');
            updateUI();
        });
        return;
    }
    
    // Interactividad extra: Clic en el texto también alterna completado
    if (target.classList.contains('task-text')) {
        tasks[index].completed = !tasks[index].completed;
        updateUI();
    }
});

// 8. EVENTO: Limpiar Todo con Confirmación (Interactividad de seguridad)
clearAllBtn.addEventListener('click', () => {
    // Una micro-interacción de confirmación nativa
    if(tasks.length > 0 && confirm('¿Seguro que quieres borrar TODAS las tareas?')) {
        // Podríamos animar todas saliendo, pero para simplificar:
        tasks = [];
        showToast('Lista limpia', 'delete');
        updateUI();
    }
});


// --- INICIO ---
document.addEventListener('DOMContentLoaded', updateUI);