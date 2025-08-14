// src/utils/mailer.js
import nodemailer from 'nodemailer';
import config from '../config/config.js';

const transporter = nodemailer.createTransport({
  host: config.mail.host,
  port: config.mail.port,
  secure: config.mail.port === 465, // true for 465, false for other ports
  auth: {
    user: config.mail.user,
    pass: config.mail.pass
  }
});

export async function sendMail({ to, subject, html, text }) {
  const info = await transporter.sendMail({
    from: config.mail.from,
    to,
    subject,
    text,
    html
  });
  return info;
}
