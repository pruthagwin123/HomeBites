const express = require('express');
const { getCart, addCartItem, updateCartItemQuantity, removeCartItem } = require('./cart.controller');

const router = express.Router();

router.get('/', getCart);
router.post('/items', addCartItem);
router.patch('/items/:foodId', updateCartItemQuantity);
router.delete('/items/:foodId', removeCartItem);

module.exports = router;
