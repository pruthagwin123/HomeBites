function orderDeliveredOtpTemplate({ otp, customerName, orderId }) {
  return {
    subject: `HomeBites Delivery OTP for Order #${orderId}`,
    html: `
      <h2>Hi ${customerName},</h2>
      <p>Please share the OTP below with your delivery partner to confirm secure handoff.</p>
      <p style="font-size: 24px; letter-spacing: 6px;"><strong>${otp}</strong></p>
      <p>This OTP is valid for a limited time.</p>
    `
  };
}

module.exports = { orderDeliveredOtpTemplate };
