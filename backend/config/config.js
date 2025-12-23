const dotenv = require('dotenv');
dotenv.config();

if (!process.env.JWT_SECRET || !process.env.MONGO_URI || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error("Missing required environment variables in .env file");
}

module.exports = {
  port: process.env.PORT || 8080,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  clientUrl: process.env.CLIENT_URL || 'https://encrolink.netlify.app' 
};

