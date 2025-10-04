// controllers/exercisesController.js

// Simulación de base de datos en memoria
let exercises = [
  { id: 1, name: "Press banca", muscle_group: "Pecho", createdAt: "2025-09-19" },
  { id: 2, name: "Sentadilla", muscle_group: "Piernas", createdAt: "2025-09-20" },
  { id: 3, name: "Curl bíceps", muscle_group: "Bíceps", createdAt: "2025-09-21" },
  { id: 4, name: "Remo con barra", muscle_group: "Espalda", createdAt: "2025-09-22" },
  { id: 5, name: "Press militar", muscle_group: "Hombros", createdAt: "2025-09-23" }
];

// GET /api/exercises
function getAllExercises(req, res) {
  res.json(exercises);
}

// GET /api/exercises/:id
function getExerciseById(req, res) {
  const id = Number(req.params.id);
  const exercise = exercises.find(e => e.id === id);
  if (!exercise) return res.status(404).json({ error: "Exercise not found" });
  res.json(exercise);
}

// POST /api/exercises
function createExercise(req, res) {
  const { name, muscle_group } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });

  const newExercise = {
    id: exercises.length ? exercises[exercises.length - 1].id + 1 : 1,
    name,
    muscle_group: muscle_group || "",
    createdAt: new Date().toISOString().split("T")[0]
  };

  exercises.push(newExercise);
  res.status(201).json(newExercise);
}

// PUT /api/exercises/:id
function replaceExercise(req, res) {
  const id = Number(req.params.id);
  const { name, muscle_group } = req.body;
  const index = exercises.findIndex(e => e.id === id);

  if (index === -1) return res.status(404).json({ error: "Exercise not found" });
  if (!name) return res.status(400).json({ error: "name is required for PUT" });

  exercises[index] = { id, name, muscle_group: muscle_group || "", createdAt: new Date().toISOString().split("T")[0] };
  res.json(exercises[index]);
}

// PATCH /api/exercises/:id
function updateExercise(req, res) {
  const id = Number(req.params.id);
  const exercise = exercises.find(e => e.id === id);

  if (!exercise) return res.status(404).json({ error: "Exercise not found" });

  if (req.body.name !== undefined) exercise.name = req.body.name;
  if (req.body.muscle_group !== undefined) exercise.muscle_group = req.body.muscle_group;

  res.json(exercise);
}

// DELETE /api/exercises/:id
function deleteExercise(req, res) {
  const id = Number(req.params.id);
  const index = exercises.findIndex(e => e.id === id);
  if (index === -1) return res.status(404).json({ error: "Exercise not found" });

  exercises.splice(index, 1);
  res.status(204).send();
}

module.exports = {
  getAllExercises,
  getExerciseById,
  createExercise,
  replaceExercise,
  updateExercise,
  deleteExercise
};
