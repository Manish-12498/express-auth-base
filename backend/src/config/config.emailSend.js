const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or 'yahoo', 'outlook', etc.
  auth: {
    user: 'your@gmail.com',
    pass: 'your-app-password'  // NOT your regular password
  }
});

// Send email
const info = await transporter.sendMail({
  from: '"Your Name" <your@gmail.com>',
  to: 'recipient@example.com',       // comma-separated for multiple
  subject: 'Hello!',
  text: 'Plain text version',
  html: '<b>HTML version</b>',
});

console.log('Message sent:', info.messageId);