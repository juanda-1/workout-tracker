const express = require('express');
const router = express.Router();
const validateId = require('../middleware/validateId');
const progressController = require('../controllers/progressController');

router.get('/', progressController.getAllProgress);
router.get('/:id', validateId, progressController.getProgressById);
router.post('/', progressController.createProgress);
router.put('/:id', validateId, progressController.replaceProgress);
router.patch('/:id', validateId, progressController.updateProgress);
router.delete('/:id', validateId, progressController.deleteProgress);

module.exports = router;
