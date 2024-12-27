const express = require('express');
const router = express.Router();
const ingradientsController = require('../controllers/ingradients');

router.post('/', ingradientsController.create);
router.get('/', ingradientsController.getAll);

module.exports = router;