const express = require('express');
const router = express.Router();
const validateId = require('../middleware/validateId');
const usersController = require('../controllers/usersController');

// GET /api/users?limit=10&page=1
router.get('/', usersController.getAllUsers);

// GET /api/users/:id
router.get('/:id', validateId, usersController.getUserById);

// POST /api/users
router.post('/', usersController.createUser);

// PUT /api/users/:id
router.put('/:id', validateId, usersController.replaceUser);

// PATCH /api/users/:id
router.patch('/:id', validateId, usersController.updateUser);

// DELETE /api/users/:id
router.delete('/:id', validateId, usersController.deleteUser);

module.exports = router;