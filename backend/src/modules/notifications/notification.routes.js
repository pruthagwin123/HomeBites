const express = require('express');
const { sendOrderNotificationEmail } = require('./notification.service');

const router = express.Router();

router.post('/order-email', async (req, res, next) => {
  try {
    await sendOrderNotificationEmail(req.body);
    return res.status(200).json({ success: true, message: 'Email notification triggered' });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
