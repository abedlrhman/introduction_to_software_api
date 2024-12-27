const express = require('express');
const router = express.Router();
const countriesController = require('../controllers/countries');

router.post('/', countriesController.create);
router.get('/', countriesController.getAll);

module.exports = router;