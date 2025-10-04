// controllers/usersController.js
const { db, getNextId } = require('../db');

// GET /api/users
function getAllUsers(req, res) {
  res.json(db.users);
}

// GET /api/users/:id
function getUserById(req, res) {
  const id = Number(req.params.id);
  const user = db.users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
}

// POST /api/users
function createUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "name, email and password are required" });
  }

  const newUser = { id: getNextId('users'), name, email, password };
  db.users.push(newUser);
  res.status(201).json(newUser);
}

// PUT /api/users/:id
function replaceUser(req, res) {
  const id = Number(req.params.id);
  const { name, email, password } = req.body;
  const index = db.users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: "User not found" });

  db.users[index] = { id, name, email, password };
  res.json(db.users[index]);
}

// PATCH /api/users/:id
function updateUser(req, res) {
  const id = Number(req.params.id);
  const user = db.users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });

  if (req.body.name !== undefined) user.name = req.body.name;
  if (req.body.email !== undefined) user.email = req.body.email;
  if (req.body.password !== undefined) user.password = req.body.password;

  res.json(user);
}

// DELETE /api/users/:id
function deleteUser(req, res) {
  const id = Number(req.params.id);
  const index = db.users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: "User not found" });

  db.users.splice(index, 1);
  res.status(204).send();
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  replaceUser,
  updateUser,
  deleteUser
};
