const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },   // sender's name
  email: { type: String, required: true },  // sender's email
  message: { type: String, required: true } // message content
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);

