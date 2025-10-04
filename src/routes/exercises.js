const express = require('express');
const router = express.Router();
const validateId = require('../middleware/validateId');
const exercisesController = require('../controllers/exercisesController');

router.get('/', exercisesController.getAllExercises);
router.get('/:id', validateId, exercisesController.getExerciseById);
router.post('/', exercisesController.createExercise);
router.put('/:id', validateId, exercisesController.replaceExercise);
router.patch('/:id', validateId, exercisesController.updateExercise);
router.delete('/:id', validateId, exercisesController.deleteExercise);

module.exports = router;
