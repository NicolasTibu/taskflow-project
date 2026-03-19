# API REST de Tareas — TaskFlow Pro

API REST construida con Node.js y Express para la gestión de tareas. Arquitectura por capas, validación defensiva y manejo centralizado de errores.

---

## Arquitectura de carpetas

```
server/
├── src/
│   ├── config/
│   │   └── env.js           # Carga y validación de variables de entorno
│   ├── controllers/
│   │   └── task.controller.js   # Capa HTTP: validación, códigos de estado
│   ├── services/
│   │   └── task.service.js      # Lógica de negocio pura
│   ├── routes/
│   │   └── task.routes.js       # Enrutamiento por verbos HTTP
│   └── index.js                 # Punto de entrada, montaje de middlewares
├── postman/
│   └── tasks-api.postman_collection.json   # Pruebas de integración
├── .env
├── .gitignore
├── package.json
└── README.md
```

### Responsabilidades por capa

| Capa | Responsabilidad |
|------|-----------------|
| **config** | Inicialización de `dotenv` y validación de variables críticas (`PORT`). |
| **services** | Reglas de negocio, persistencia simulada (array en memoria). Sin lógica HTTP. |
| **controllers** | Mapeo petición/respuesta, validación de `req.body`/`req.params`, códigos HTTP. |
| **routes** | Asociación de verbos HTTP a controladores y prefijo `/api/v1/tasks`. |
| **index.js** | Montaje de Express: CORS, `express.json()`, rutas y middleware global de errores. |

---

## Middlewares: funcionamiento técnico

### Middleware de errores (4 parámetros)

En Express, un middleware de **cuatro parámetros** `(err, req, res, next)` es el *error-handling middleware*. Solo se ejecuta cuando:

1. Se llama a `next(err)` en un middleware o ruta anterior.
2. Se lanza una excepción síncrona no capturada en un handler anterior.

**Implementación actual:**

```js
app.use((err, req, res, _next) => {
  if (err instanceof Error && err.message === 'NOT_FOUND') {
    return res.sendStatus(404);
  }
  console.error(err);
  return res.status(500).json({ error: 'Error interno del servidor' });
});
```

- **NOT_FOUND**: Se traduce a HTTP 404.
- **Resto de errores**: Se registra la traza en consola y se devuelve 500 con mensaje genérico, evitando exponer detalles internos al cliente.

### Orden de ejecución

1. `cors()` — Permite peticiones desde otros orígenes (frontend).
2. `express.json()` — Parsea el cuerpo JSON de las peticiones.
3. Rutas (health, tasks).
4. Error-handling middleware — Último en la cadena; captura errores no manejados.

---

## API REST — Ejemplos prácticos

**Base URL:** `http://localhost:3000/api/v1/tasks`

### Obtener todas las tareas

```http
GET /api/v1/tasks
```

**Respuesta 200 OK:**
```json
[
  {
    "id": "1",
    "title": "Mi primera tarea",
    "completed": false,
    "emoji": "🎯",
    "priority": "medium",
    "dueDate": null
  }
]
```

### Crear tarea

```http
POST /api/v1/tasks
Content-Type: application/json

{
  "title": "Comprar leche",
  "completed": false,
  "emoji": "🛒",
  "priority": "high",
  "dueDate": "2025-03-20"
}
```

**Respuesta 201 Created:**
```json
{
  "id": "2",
  "title": "Comprar leche",
  "completed": false,
  "emoji": "🛒",
  "priority": "high",
  "dueDate": "2025-03-20"
}
```

### Actualizar tarea (PATCH)

```http
PATCH /api/v1/tasks/2
Content-Type: application/json

{
  "completed": true
}
```

**Respuesta 200 OK:** Devuelve la tarea actualizada.

### Eliminar tarea

```http
DELETE /api/v1/tasks/2
```

**Respuesta 204 No Content**

### Errores esperados

| Código | Condición |
|--------|-----------|
| 400 | `title` vacío, `completed` no booleano, `priority` inválida. |
| 404 | ID de tarea inexistente en PATCH o DELETE. |
| 500 | Error interno no controlado. |

---

## Ejecución

```bash
cd server
npm install
npm run dev    # nodemon src/index.js
```

El servidor escucha en el puerto definido en `.env` (por defecto `3000`). Si `PORT` no está definido, el proceso lanza un error y no arranca.

---

## Pruebas

Importa `postman/tasks-api.postman_collection.json` en Postman o Thunder Client para ejecutar pruebas de integración, incluyendo casos de error (POST sin título, DELETE con ID inexistente, etc.).
