const express = require('express');
const { listFoods, createFood, updateFood, compareDishPrices } = require('./food.controller');

const router = express.Router();

router.get('/', listFoods);
router.get('/compare/:dishId', compareDishPrices);
router.post('/', createFood);
router.patch('/:foodId', updateFood);

module.exports = router;
