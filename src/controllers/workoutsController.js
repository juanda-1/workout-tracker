// controllers/workoutsController.js
const { db, getNextId } = require('../db');

// GET /api/workouts
function getAllWorkouts(req, res) {
  return res.json(db.workouts);
}

// GET /api/workouts/:id
function getWorkoutById(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id parameter' });

  const workout = db.workouts.find(w => w.id === id);
  if (!workout) return res.status(404).json({ error: 'Workout not found' });
  return res.json(workout);
}

// POST /api/workouts
function createWorkout(req, res) {
  const { userId, title, date } = req.body;
  if (!userId || !title) {
    return res.status(400).json({ error: 'userId and title are required' });
  }

  const newWorkout = {
    id: getNextId('workouts'),
    userId,
    title,
    date: date || new Date().toISOString().slice(0, 10)
  };

  db.workouts.push(newWorkout);
  res.location(`/api/workouts/${newWorkout.id}`);
  return res.status(201).json(newWorkout);
}

// PUT /api/workouts/:id
function replaceWorkout(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id parameter' });

  const { userId, title, date } = req.body;
  if (!userId || !title) {
    return res.status(400).json({ error: 'userId and title are required for PUT' });
  }

  const index = db.workouts.findIndex(w => w.id === id);
  if (index === -1) return res.status(404).json({ error: 'Workout not found' });

  db.workouts[index] = { id, userId, title, date: date || db.workouts[index].date };
  return res.json(db.workouts[index]);
}

// PATCH /api/workouts/:id
function updateWorkout(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id parameter' });

  const workout = db.workouts.find(w => w.id === id);
  if (!workout) return res.status(404).json({ error: 'Workout not found' });

  if (req.body.userId !== undefined) workout.userId = req.body.userId;
  if (req.body.title !== undefined) workout.title = req.body.title;
  if (req.body.date !== undefined) workout.date = req.body.date;

  return res.json(workout);
}

// DELETE /api/workouts/:id
function deleteWorkout(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id parameter' });

  const index = db.workouts.findIndex(w => w.id === id);
  if (index === -1) return res.status(404).json({ error: 'Workout not found' });

  db.workouts.splice(index, 1);
  return res.status(204).send();
}

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  replaceWorkout,
  updateWorkout,
  deleteWorkout
};
