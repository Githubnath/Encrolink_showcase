const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,    // Updated to EMAIL_USER for consistency
    pass: process.env.EMAIL_PASS,    // Updated to EMAIL_PASS for consistency
  },
});

// Send verification email
exports.sendVerificationEmail = async (email, token) => {
  const link = `${process.env.FRONTEND_URL}/verify/${token}`;  // Updated CLIENT_URL to FRONTEND_URL
  await transporter.sendMail({
    from: `"EncroLink" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email',
    html: `<p>Click <a href="${link}">here</a> to verify your account.</p>`,
  });
};

// Send password reset email
exports.sendResetPasswordEmail = async (email, token) => {
  const link = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  await transporter.sendMail({
    from: `"EncroLink" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Reset Your Password',
    html: `<p>Click <a href="${link}">here</a> to reset your password.</p>`,
  });
};
