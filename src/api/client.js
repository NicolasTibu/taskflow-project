/**
 * Cliente HTTP para la API de tareas.
 * Usa la API nativa fetch para consumir el servidor Node.js.
 */

const API_BASE = 'http://localhost:3000/api/v1/tasks';

async function fetchTasks() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new ApiError(res.status, await res.text());
  return res.json();
}

async function createTask(data) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new ApiError(res.status, await res.text());
  return res.json();
}

async function updateTask(id, data) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new ApiError(res.status, await res.text());
  return res.json();
}

async function deleteTask(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new ApiError(res.status, await res.text());
}

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

export { fetchTasks, createTask, updateTask, deleteTask };
