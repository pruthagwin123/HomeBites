const nodemailer = require('nodemailer');
const { env } = require('../../config/env');

const hasSmtpConfig = Boolean(env.smtpHost && env.smtpUser && env.smtpPass);

const transporter = hasSmtpConfig
  ? nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: false,
      auth: {
        user: env.smtpUser,
        pass: env.smtpPass
      }
    })
  : null;

async function sendEmail({ to, subject, html }) {
  if (!to || !subject || !html) {
    return { sent: false, reason: 'Missing email payload' };
  }

  if (!transporter) {
    console.warn('SMTP is not configured. Email skipped.');
    return { sent: false, reason: 'SMTP not configured' };
  }

  await transporter.sendMail({
    from: env.smtpUser,
    to,
    subject,
    html
  });

  return { sent: true };
}

async function sendOrderNotificationEmail({ to, subject, html }) {
  await sendEmail({ to, subject, html });
}

module.exports = { sendOrderNotificationEmail, sendEmail };
