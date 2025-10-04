// src/db.js
console.log("⚠️ Running API without real database (using in-memory data)");

const db = {
  users: [
    { id: 1, name: "Juan", email: "juan@example.com" },
    { id: 2, name: "Michell", email: "michell@example.com" },
    { id: 3, name: "andres", email: "andres@example.com" },
    { id: 4, name: "sebastian", email: "sebastian@example.com" }
  ],
  workouts: [
    { id: 1, userId: 1, title: "Rutina de pecho", date: "2025-09-19" },
    { id: 2, userId: 2, title: "Piernas nivel avanzado", date: "2025-09-20" },
    { id: 3, userId: 3, title: "Espalda y bíceps", date: "2025-09-21" },
    { id: 4, userId: 4, title: "Full body express", date: "2025-09-22" }
  ],
  exercises: [
    { id: 1, workoutId: 1, name: "Press banca", reps: 12, sets: 4 },
    { id: 2, workoutId: 1, name: "Aperturas con mancuernas", reps: 15, sets: 3 },
    { id: 3, workoutId: 2, name: "Sentadillas", reps: 10, sets: 4 },
    { id: 4, workoutId: 2, name: "Peso muerto rumano", reps: 12, sets: 3 },
    { id: 5, workoutId: 3, name: "Dominadas", reps: 8, sets: 4 },
    { id: 6, workoutId: 3, name: "Remo con barra", reps: 12, sets: 3 },
    { id: 7, workoutId: 4, name: "Burpees", reps: 20, sets: 3 },
    { id: 8, workoutId: 4, name: "Plancha abdominal", reps: 1, sets: 3 } // reps=1 porque es por tiempo
  ],
  progress: [
    { id: 1, userId: 1, weight: 70, date: "2025-09-19" },
    { id: 2, userId: 2, weight: 60, date: "2025-09-20" },
    { id: 3, userId: 3, weight: 80, date: "2025-09-21" },
    { id: 4, userId: 4, weight: 55, date: "2025-09-22" }
  ]
};

// 🔑 función para autoincrementar IDs
function getNextId(collection) {
  const items = db[collection];
  return items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
}

module.exports = { db, getNextId };
