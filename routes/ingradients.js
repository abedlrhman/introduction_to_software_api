const express = require('express');
const router = express.Router();
const ingredientsController = require('../controllers/ingradients');

router.post('/', ingredientsController.create);
router.get('/', ingredientsController.getAll);
router.put('/:id', ingredientsController.update);
router.delete('/:id', ingredientsController.remove);

module.exports = router;