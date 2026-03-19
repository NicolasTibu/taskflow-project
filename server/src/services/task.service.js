let tasks = [];
let nextId = 1;

function obtenerTodas() {
  return tasks;
}

function crearTarea(data) {
  const task = {
    id: String(nextId++),
    title: data.title,
    completed: Boolean(data.completed),
    emoji: data.emoji != null ? String(data.emoji) : '',
    priority: data.priority && ['high', 'medium', 'low'].includes(data.priority) ? data.priority : 'medium',
    dueDate: data.dueDate ? String(data.dueDate) : null
  };

  tasks.push(task);
  return task;
}

function actualizarTarea(id, data) {
  const idx = tasks.findIndex((t) => t.id === String(id));
  if (idx === -1) {
    throw new Error('NOT_FOUND');
  }

  if (data.title !== undefined) tasks[idx].title = String(data.title).trim();
  if (data.completed !== undefined) tasks[idx].completed = Boolean(data.completed);
  if (data.emoji !== undefined) tasks[idx].emoji = String(data.emoji);
  if (data.priority !== undefined && ['high', 'medium', 'low'].includes(data.priority)) {
    tasks[idx].priority = data.priority;
  }
  if (data.dueDate !== undefined) tasks[idx].dueDate = data.dueDate ? String(data.dueDate) : null;
  return tasks[idx];
}

function eliminarTarea(id) {
  const idx = tasks.findIndex((t) => t.id === String(id));
  if (idx === -1) {
    throw new Error('NOT_FOUND');
  }

  tasks.splice(idx, 1);
}

module.exports = {
  obtenerTodas,
  crearTarea,
  actualizarTarea,
  eliminarTarea
};
