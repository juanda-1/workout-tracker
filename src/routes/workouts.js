const express = require('express');
const router = express.Router();
const validateId = require('../middleware/validateId');
const workoutsController = require('../controllers/workoutsController');

router.get('/', workoutsController.getAllWorkouts);
router.get('/:id', validateId, workoutsController.getWorkoutById);
router.post('/', workoutsController.createWorkout);
router.put('/:id', validateId, workoutsController.replaceWorkout);
router.patch('/:id', validateId, workoutsController.updateWorkout);
router.delete('/:id', validateId, workoutsController.deleteWorkout);

module.exports = router;
