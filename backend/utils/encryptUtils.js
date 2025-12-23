const crypto = require('crypto');

const algorithm = 'aes-256-cbc';

// Ensure environment variables exist and are valid hex strings
if (!process.env.ENCRYPT_KEY) {
  throw new Error('ENCRYPT_KEY environment variable is not set');
}
if (!process.env.ENCRYPT_IV) {
  throw new Error('ENCRYPT_IV environment variable is not set');
}

let key, iv;
try {
  key = Buffer.from(process.env.ENCRYPT_KEY, 'hex');
} catch (err) {
  throw new Error('ENCRYPT_KEY is not a valid hex string');
}
try {
  iv = Buffer.from(process.env.ENCRYPT_IV, 'hex');
} catch (err) {
  throw new Error('ENCRYPT_IV is not a valid hex string');
}

// Check key and IV length for AES-256-CBC
if (key.length !== 32) {
  throw new Error(`ENCRYPT_KEY must be 32 bytes (64 hex characters), but got ${key.length} bytes`);
}
if (iv.length !== 16) {
  throw new Error(`ENCRYPT_IV must be 16 bytes (32 hex characters), but got ${iv.length} bytes`);
}

exports.encryptMessage = (text) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

exports.decryptMessage = (encryptedText) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

