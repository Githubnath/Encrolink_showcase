// routes/contact.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

/* ---------- Optional test endpoint ---------- */
router.get('/test', (_req, res) => {
  res.status(200).json({ success: true, message: '‚úÖ Contact route is working!' });
});

/* ---------- POST /api/contact ---------- */
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields (name, email, message) are required.'
    });
  }

  try {
    // Transporter configuration
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // ‚ö†Ô∏è For production, better use SMTP or a dedicated service (SendGrid, Mailgun, etc.)
      auth: {
        user: process.env.EMAIL_USER,   // Your Gmail/SMTP user
        pass: process.env.EMAIL_PASS,   // Your Gmail/SMTP password or App Password
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_RECEIVER, // Who receives the contact form messages
      subject: `Ì≥© New Contact Form Message from ${name}`,
      text: `From: ${name} <${email}>\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    res.status(200).json({
      success: true,
      message: '‚úÖ Message sent successfully!'
    });
  } catch (err) {
    console.error('‚ùå Contact form error:', err.message);

    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.'
    });
  }
});

module.exports = router;

