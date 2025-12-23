// backend/controllers/contactController.js
const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

// Submit Contact Form
exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = await Contact.create({ name, email, message });

    // Optionally send email notification to admin
    await sendEmail(
      process.env.ADMIN_EMAIL,
      'New Contact Form Submission',
      `From: ${name} <${email}>\n\n${message}`
    );

    res.status(201).json({ message: 'Contact form submitted successfully', contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

