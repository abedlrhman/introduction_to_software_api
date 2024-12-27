const express = require('express');
const router = express.Router();
const dishesController = require('../controllers/dishes');

router.post('/', dishesController.create);
router.get('/', dishesController.getAll);

router.post('/:dishId/ingredients', dishesController.createIngradient);
router.post('/:dishId/category', dishesController.createCategory);

module.exports = router;