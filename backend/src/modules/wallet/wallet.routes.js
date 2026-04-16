const express = require('express');
const {
	getWallet,
	topUpWallet,
	addCashback,
	addRefund,
	getTransactionHistory
} = require('./wallet.controller');

const router = express.Router();

router.get('/', getWallet);
router.get('/transactions', getTransactionHistory);
router.post('/top-up', topUpWallet);
router.post('/cashback', addCashback);
router.post('/refund', addRefund);

module.exports = router;
