const express = require('express');
const cors = require('cors');

const { PORT } = require('./config/env');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/v1/tasks', taskRoutes);

// Middleware global de errores (4 parámetros)
app.use((err, req, res, _next) => {
  if (err instanceof Error && err.message === 'NOT_FOUND') {
    return res.sendStatus(404);
  }

  console.error(err);
  return res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(Number(PORT), () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
