const { encryptMessage } = require('../utils/encryptUtils');

module.exports = async (req, res, next) => {
  try {
    if (req.body.content) {
      req.body.encryptedContent = encryptMessage(req.body.content);
      delete req.body.content;
    }
    next();
  } catch (err) {
    res.status(500).json({ error: 'Encryption failed' });
  }
};

