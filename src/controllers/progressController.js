// controllers/progressController.js

// Simulación de base de datos en memoria
let progress = [
  { id: 1, userId: 1, workoutId: 1, notes: "Semana 1 - muy bien", createdAt: "2025-09-19" },
  { id: 2, userId: 2, workoutId: 1, notes: "Semana 1 - regular", createdAt: "2025-09-20" }
];

// Listar todos los progresos
function getAllProgress(req, res) {
  res.json(progress);
}

// Obtener progreso por ID
function getProgressById(req, res) {
  const id = Number(req.params.id);
  const record = progress.find(p => p.id === id);
  if (!record) return res.status(404).json({ error: "Progress record not found" });
  res.json(record);
}

// Crear progreso
function createProgress(req, res) {
  const { userId, workoutId, notes } = req.body;
  if (!userId || !workoutId) {
    return res.status(400).json({ error: "userId and workoutId are required" });
  }

  const newRecord = {
    id: progress.length ? progress[progress.length - 1].id + 1 : 1,
    userId,
    workoutId,
    notes: notes || "",
    createdAt: new Date().toISOString().split("T")[0]
  };

  progress.push(newRecord);
  res.status(201).json(newRecord);
}

// Reemplazar (PUT)
function replaceProgress(req, res) {
  const id = Number(req.params.id);
  const { userId, workoutId, notes } = req.body;
  const index = progress.findIndex(p => p.id === id);

  if (index === -1) return res.status(404).json({ error: "Progress record not found" });
  if (!userId || !workoutId) {
    return res.status(400).json({ error: "userId and workoutId are required for PUT" });
  }

  progress[index] = { id, userId, workoutId, notes: notes || "", createdAt: new Date().toISOString().split("T")[0] };
  res.json(progress[index]);
}

// Actualización parcial (PATCH)
function updateProgress(req, res) {
  const id = Number(req.params.id);
  const record = progress.find(p => p.id === id);

  if (!record) return res.status(404).json({ error: "Progress record not found" });

  if (req.body.userId !== undefined) record.userId = req.body.userId;
  if (req.body.workoutId !== undefined) record.workoutId = req.body.workoutId;
  if (req.body.notes !== undefined) record.notes = req.body.notes;

  res.json(record);
}

// Eliminar progreso
function deleteProgress(req, res) {
  const id = Number(req.params.id);
  const index = progress.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Progress record not found" });

  progress.splice(index, 1);
  res.status(204).send();
}

module.exports = {
  getAllProgress,
  getProgressById,
  createProgress,
  replaceProgress,
  updateProgress,
  deleteProgress
};
