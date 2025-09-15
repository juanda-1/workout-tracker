const express = require("express"); // Import express
const app = express(); // Create an instance of express
const { port } = require('./config/env'); // Import the port from the env file

// Inicializacion del servidor y primera ruta
app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});

// Datos de ejemplo (simulación de base de datos en memoria)
const usuarios = [
  { id: 1, nombre: "Juan", email: "juan@example.com" },
  { id: 2, nombre: "Ana", email: "ana@example.com" }
];

const ejercicios = [
  { id: 1, nombre: "Sentadillas", categoria: "Fuerza" },
  { id: 2, nombre: "Correr", categoria: "Cardio" }
];

const workouts = [
  { 
    id: 1, 
    usuarioId: 1, 
    nombre: "Rutina de fuerza lunes", 
    ejercicios: [
      { ejercicioId: 1, repeticiones: 10, series: 3, peso: "20kg" }
    ], 
    fechaProgramada: "2025-09-15T10:00:00", 
    comentarios: "Enfocado en tren inferior"
  },
  { 
    id: 2, 
    usuarioId: 2, 
    nombre: "Cardio matutino", 
    ejercicios: [
      { ejercicioId: 2, repeticiones: null, series: null, peso: null }
    ], 
    fechaProgramada: "2025-09-16T07:00:00", 
    comentarios: "30 min trotando"
  }
];

const reportes = [
  { 
    id: 1, 
    usuarioId: 1, 
    workoutId: 1, 
    fecha: "2025-09-15", 
    detalles: "Completado con éxito, aumentó resistencia"
  },
  { 
    id: 2, 
    usuarioId: 2, 
    workoutId: 2, 
    fecha: "2025-09-16", 
    detalles: "30 minutos corriendo a ritmo moderado"
  }
];


// ---------------- Rutas GET ---------------- //

// Listar todos los usuarios
app.get('/usuarios', (req, res) => {
  res.json(usuarios); // <-- corregido
});

// Obtener un usuario por ID
app.get('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id == req.params.id); // <-- corregido
  if (usuario) {
    res.send(`Usuario: ${usuario.nombre}, Email: ${usuario.email}`); // <-- corregido
  } else {
    res.status(404).json({ error: "Usuario no encontrado" });
  }
});

// Listar todos los ejercicios
app.get('/ejercicios', (req, res) => {
  res.json(ejercicios); // <-- corregido
});

// Obtener un ejercicio por ID
app.get('/ejercicios/:id', (req, res) => {
  const ejercicio = ejercicios.find(e => e.id == req.params.id); // <-- corregido
  if (ejercicio) {
    res.json(ejercicio);
  } else {
    res.status(404).send("Ejercicio no encontrado");
  }
});

// Listar todos los workouts
app.get('/workouts', (req, res) => {
  res.json(workouts);
});

// Obtener un workout por ID
app.get('/workouts/:id', (req, res) => {
  const workout = workouts.find(w => w.id == req.params.id);
  if (workout) {
    res.json(workout);
  } else {
    res.status(404).send("Workout no encontrado");
  }
});

// Listar todos los reportes
app.get('/reportes', (req, res) => {
  res.json(reportes);
});

// Obtener un reporte por ID
app.get('/reportes/:id', (req, res) => {
  const reporte = reportes.find(r => r.id == req.params.id);
  if (reporte) {
    res.json(reporte);
  } else {
    res.status(404).send("Reporte no encontrado");
  }
});


// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
