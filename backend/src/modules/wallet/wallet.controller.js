const { asyncHandler } = require('../../utils/asyncHandler');
const { makeId, walletsByUser } = require('../../data/mockStore');

function ensureWallet(userId) {
  if (!walletsByUser[userId]) {
    walletsByUser[userId] = {
      balance: 0,
      cashbackBalance: 0,
      transactions: []
    };
  }

  return walletsByUser[userId];
}

const getWallet = asyncHandler(async (req, res) => {
  const userId = req.query.userId || 'user-customer-1';
  return res.status(200).json({ success: true, data: ensureWallet(userId) });
});

const topUpWallet = asyncHandler(async (req, res) => {
  const userId = req.body.userId || 'user-customer-1';
  const amount = Number(req.body.amount || 0);
  if (amount <= 0) {
    return res.status(400).json({ success: false, message: 'amount must be greater than 0' });
  }

  const wallet = ensureWallet(userId);
  wallet.balance += amount;
  wallet.transactions.unshift({
    id: makeId('txn'),
    type: 'add-money',
    amount,
    note: 'Added from wallet top-up',
    createdAt: new Date().toISOString()
  });

  return res.status(200).json({ success: true, message: 'Wallet topped up', data: wallet });
});

const addCashback = asyncHandler(async (req, res) => {
  const userId = req.body.userId || 'user-customer-1';
  const amount = Number(req.body.amount || 0);
  const note = req.body.note || 'Cashback reward';
  if (amount <= 0) {
    return res.status(400).json({ success: false, message: 'amount must be greater than 0' });
  }

  const wallet = ensureWallet(userId);
  wallet.cashbackBalance += amount;
  wallet.transactions.unshift({
    id: makeId('txn'),
    type: 'cashback',
    amount,
    note,
    createdAt: new Date().toISOString()
  });

  return res.status(200).json({ success: true, message: 'Cashback added', data: wallet });
});

const addRefund = asyncHandler(async (req, res) => {
  const userId = req.body.userId || 'user-customer-1';
  const amount = Number(req.body.amount || 0);
  const note = req.body.note || 'Refund credited';
  if (amount <= 0) {
    return res.status(400).json({ success: false, message: 'amount must be greater than 0' });
  }

  const wallet = ensureWallet(userId);
  wallet.balance += amount;
  wallet.transactions.unshift({
    id: makeId('txn'),
    type: 'refund',
    amount,
    note,
    createdAt: new Date().toISOString()
  });

  return res.status(200).json({ success: true, message: 'Refund added', data: wallet });
});

const getTransactionHistory = asyncHandler(async (req, res) => {
  const userId = req.query.userId || 'user-customer-1';
  const wallet = ensureWallet(userId);
  return res.status(200).json({ success: true, data: wallet.transactions });
});

module.exports = { getWallet, topUpWallet, addCashback, addRefund, getTransactionHistory };
