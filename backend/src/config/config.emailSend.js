const nodemailer = require('nodemailer');
const {SMTP_EMAIL,SMTP_PASSWORD}=require("../config/config")

// Create transporter
const sendMail = async (email, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or 'yahoo', 'outlook', etc.
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD  // NOT your regular password
        }
    });

    // Send email
    const info = await transporter.sendMail({
        from: SMTP_EMAIL,
        to: email,       // comma-separated for multiple
        subject: subject,
        text: 'Plain text version',
        html: html,
    });

    console.log('Message sent:', info.messageId);
}

module.exports = sendMail;