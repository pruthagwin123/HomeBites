const express = require('express');
const { createOrder, getMyOrders, updateOrderStatus, getChefOrders } = require('./order.controller');

const router = express.Router();

router.post('/', createOrder);
router.get('/me', getMyOrders);
router.get('/chef', getChefOrders);
router.patch('/:orderId/status', updateOrderStatus);

module.exports = router;
