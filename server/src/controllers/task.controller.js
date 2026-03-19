const taskService = require('../services/task.service');

function obtenerTodas(_req, res) {
  const tasks = taskService.obtenerTodas();
  return res.status(200).json(tasks);
}

function crearTarea(req, res) {
  const body = req.body;

  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'INVALID_BODY' });
  }

  const { title, completed, emoji, priority, dueDate } = body;

  if (typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'INVALID_TITLE' });
  }
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'INVALID_COMPLETED' });
  }
  if (priority !== undefined && !['high', 'medium', 'low'].includes(priority)) {
    return res.status(400).json({ error: 'INVALID_PRIORITY' });
  }

  const task = taskService.crearTarea({
    title: title.trim(),
    completed,
    emoji: emoji != null ? String(emoji) : '',
    priority: priority || 'medium',
    dueDate: dueDate || null
  });
  return res.status(201).json(task);
}

function actualizarTarea(req, res) {
  const { id } = req.params || {};
  const body = req.body;

  if (typeof id !== 'string' || id.trim().length === 0) {
    return res.status(400).json({ error: 'INVALID_ID' });
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'INVALID_BODY' });
  }

  const { title, completed, emoji, priority, dueDate } = body;
  if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
    return res.status(400).json({ error: 'INVALID_TITLE' });
  }
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'INVALID_COMPLETED' });
  }
  if (priority !== undefined && !['high', 'medium', 'low'].includes(priority)) {
    return res.status(400).json({ error: 'INVALID_PRIORITY' });
  }

  try {
    const task = taskService.actualizarTarea(id, {
      title: title !== undefined ? title.trim() : undefined,
      completed,
      emoji,
      priority,
      dueDate
    });
    return res.status(200).json(task);
  } catch (err) {
    if (err instanceof Error && err.message === 'NOT_FOUND') {
      return res.sendStatus(404);
    }
    throw err;
  }
}

function eliminarTarea(req, res) {
  const { id } = req.params || {};

  if (typeof id !== 'string' || id.trim().length === 0) {
    return res.status(400).json({ error: 'INVALID_ID' });
  }

  try {
    taskService.eliminarTarea(id);
    return res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error && err.message === 'NOT_FOUND') {
      return res.sendStatus(404);
    }
    throw err;
  }
}

module.exports = {
  obtenerTodas,
  crearTarea,
  actualizarTarea,
  eliminarTarea
};

