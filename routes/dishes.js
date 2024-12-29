const express = require('express');
const router = express.Router();
const dishesController = require('../controllers/dishes');

router.post('/', dishesController.create);
router.get('/', dishesController.getAll);
router.put('/:dishId', dishesController.update);
router.delete('/:dishId', dishesController.remove);
router.post('/:dishId/ingredients', dishesController.createIngredient);
router.post('/:dishId/category', dishesController.createCategory);
router.delete('/:dishId/category', dishesController.removeCategory);
router.delete('/:dishId/ingredients/:ingredientId', dishesController.removeIngredient);

module.exports = router;