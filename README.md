<p align="center">
  <img src="https://img.shields.io/badge/TaskFlow-Pro-6c5ce7?style=for-the-badge&logo=readme&logoColor=white" alt="TaskFlow Pro">
</p>

<h1 align="center">✨ TaskFlow Pro — Tu Espacio Productivo</h1>

<p align="center">
  <i>Gestiona tu día con fluidez</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
</p>

---

## 🎯 Descripción

**TaskFlow Pro** es una aplicación web para gestionar tareas con diseño moderno, tema oscuro/claro y una amplia variedad de funciones. Pensada para ser rápida, intuitiva y agradable de usar.

---

## ✨ Características principales

### Gestión de tareas
| Función | Descripción |
|--------|-------------|
| ➕ **Añadir tareas** | Interfaz rápida con teclado y validación |
| ✏️ **Editar tareas** | Edición inline con doble clic o botón |
| ✅ **Marcar completadas** | Un clic para marcar o desmarcar |
| 🗑️ **Eliminar tareas** | Borrado individual con animación |
| 🧹 **Limpiar todo** | Vaciar la lista con confirmación |

### Organización
| Función | Descripción |
|--------|-------------|
| 🎯 **Prioridades** | Alta, media y baja con indicador visual |
| 📅 **Fechas límite** | Opcional por tarea, con aviso de vencimiento |
| 😀 **Emojis** | Selector de emoji para personalizar cada tarea |

### Filtros y búsqueda
| Función | Descripción |
|--------|-------------|
| 🔍 **Búsqueda** | Filtro en tiempo real por texto |
| 📑 **Filtros** | Todas · Pendientes · Completadas |
| 📊 **Ordenación** | Más recientes, prioridad, fecha, texto, pendientes primero |

### Experiencia de usuario
| Función | Descripción |
|--------|-------------|
| 🌓 **Tema claro/oscuro** | Cambio de tema en sesión |
| 😊 **Indicador de ánimo** | Feedback visual según carga de tareas |
| 🔊 **Sonidos** | Feedback sonoro al añadir y eliminar |
| 📱 **Responsivo** | Adaptado a distintos tamaños de pantalla |

---

## 🛠️ Tecnologías

- **HTML5** — Estructura semántica
- **CSS3** — Flexbox, variables CSS, animaciones, glassmorphism
- **JavaScript (ES6+)** — Módulos, `fetch`, DOM, eventos
- **Font Awesome** — Iconos
- **Node.js + Express** — API REST en `server/` (ver [server/README.md](server/README.md))

---

## 🚀 Cómo ejecutarlo

### 1. Arrancar el servidor (API)
```bash
cd server
npm install
npm run dev
```
El API escucha en `http://localhost:3000`.

### 2. Abrir el frontend
- Con **Live Server** (VSCode): clic derecho en `index.html` → *Open with Live Server*.
- O abre `index.html` directamente en el navegador (nota: CORS puede requerir servidor).

### Despliegue
Frontend en **Vercel**, **Netlify** o **GitHub Pages**. Backend por separado (Railway, Render, etc.).

---

## 📁 Estructura del proyecto

```
Corner Studios/
├── index.html       # TaskFlow Pro — app principal
├── style.css        # Estilos (tema oscuro/claro)
├── app.js           # Lógica y consumo de API
├── src/
│   └── api/
│       └── client.js   # Cliente HTTP (fetch) para la API
├── server/          # API REST Node.js (ver server/README.md)
├── docs/
│   └── backend-api.md # Axios, Postman, Sentry, Swagger
├── Experimento.html
└── README.md
```

---

## 🧪 Experimento.html

Archivo de práctica con retos resueltos en HTML + JavaScript:
- Contador interactivo
- Lista de tareas mínima
- Interruptor tema día/noche

---

<p align="center">
  <sub>Hecho con 💜 por Corner Studios</sub>
</p>
