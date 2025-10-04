// src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const apiKeyMiddleware = require('./middleware/apiKey');

// Rutas
const usersRoutes = require('./routes/users');
const workoutsRoutes = require('./routes/workouts');
const exercisesRoutes = require('./routes/exercises');
const progressRoutes = require('./routes/progress');

const app = express();
const port = process.env.PORT || 3000;

// ===== Middlewares globales =====
app.use(cors()); // Permitir requests desde otros orígenes
app.use(morgan('dev')); // Logging de peticiones
app.use(express.json()); // Parseo de JSON en req.body
app.use(express.urlencoded({ extended: true })); // Parseo de formularios
app.use(apiKeyMiddleware); // Middleware para API Key

// ===== Rutas principales =====
app.use('/api/users', usersRoutes);
app.use('/api/workouts', workoutsRoutes);
app.use('/api/exercises', exercisesRoutes);
app.use('/api/progress', progressRoutes);

// ===== Root =====
app.get('/', (req, res) => {
  res.set('X-API-Status', 'ready');
  res.json({ message: 'Workout Tracker API', version: '1.0' });
});

// ===== Documentación mínima =====
app.get('/api/docs', (req, res) => {
  res.json({
    endpoints: {
      users: '/api/users',
      workouts: '/api/workouts',
      exercises: '/api/exercises',
      progress: '/api/progress'
    }
  });
});

// ===== Error handling =====
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// ===== Iniciar servidor =====
app.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
  console.log(" Running API without real database (using in-memory data)");
});
