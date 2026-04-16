const { asyncHandler } = require('../../utils/asyncHandler');
const { makeId, users, passwordResetTokens } = require('../../data/mockStore');
const { sendEmail } = require('../notifications/notification.service');
const { env } = require('../../config/env');

const signup = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ success: false, message: 'name, email, password and role are required' });
  }

  if (!['customer', 'chef'].includes(role)) {
    return res.status(400).json({ success: false, message: 'role must be customer or chef' });
  }

  const existing = users.find((item) => item.email.toLowerCase() === String(email).toLowerCase());
  if (existing) {
    return res.status(409).json({ success: false, message: 'An account with this email already exists' });
  }

  const user = {
    id: makeId('user'),
    name,
    email: String(email).toLowerCase(),
    password,
    role
  };

  users.push(user);

  return res.status(201).json({
    success: true,
    message: `Welcome to HomeBites, ${name}!`,
    data: {
      token: `token-${user.id}`,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    }
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: 'email, password and role are required' });
  }

  const user = users.find(
    (item) => item.email === String(email).toLowerCase() && item.password === password && item.role === role
  );

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  return res.status(200).json({
    success: true,
    message: `Welcome back, ${user.name.split(' ')[0]}!`,
    data: {
      token: `token-${user.id}`,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    }
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ success: false, message: 'email and role are required' });
  }

  const normalizedEmail = String(email).toLowerCase();
  const user = users.find((item) => item.email === normalizedEmail && item.role === role);

  if (!user) {
    return res.status(200).json({
      success: true,
      message: 'If this account exists, a reset link has been sent to the email.'
    });
  }

  const token = `${makeId('reset')}${makeId('token')}`;
  const expiresAt = Date.now() + 1000 * 60 * 20;

  for (let index = passwordResetTokens.length - 1; index >= 0; index -= 1) {
    if (passwordResetTokens[index].userId === user.id) {
      passwordResetTokens.splice(index, 1);
    }
  }

  passwordResetTokens.push({
    token,
    userId: user.id,
    role: user.role,
    expiresAt,
    used: false
  });

  const resetLink = `${env.frontendUrl}/auth/reset-password?token=${encodeURIComponent(token)}&role=${encodeURIComponent(
    role
  )}`;

  const emailResult = await sendEmail({
    to: user.email,
    subject: 'HomeBites Password Reset Link',
    html: `<p>Hello ${user.name},</p>
      <p>We received a request to reset your HomeBites password.</p>
      <p><a href="${resetLink}">Click here to create a new password</a></p>
      <p>This link expires in 20 minutes.</p>`
  });

  return res.status(200).json({
    success: true,
    message: 'Verification link sent. Please check your email.',
    data: emailResult.sent ? {} : { resetLink }
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword, role } = req.body;

  if (!token || !newPassword || !role) {
    return res.status(400).json({ success: false, message: 'token, role and newPassword are required' });
  }

  if (String(newPassword).length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
  }

  const tokenRow = passwordResetTokens.find(
    (item) => item.token === token && item.role === role && !item.used && item.expiresAt > Date.now()
  );

  if (!tokenRow) {
    return res.status(400).json({ success: false, message: 'Reset link is invalid or expired.' });
  }

  const user = users.find((item) => item.id === tokenRow.userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  user.password = String(newPassword);
  tokenRow.used = true;

  return res.status(200).json({ success: true, message: 'Password updated successfully.' });
});

module.exports = { signup, login, forgotPassword, resetPassword };
