// backend/controllers/messageController.js
const Message = require("../models/Message");

/**
 * @desc    Send a new encrypted message
 * @route   POST /api/messages
 * @access  Private
 */
exports.sendMessage = async (req, res) => {
  try {
    const { to, encryptedContent } = req.body;

    if (!to || !encryptedContent) {
      return res
        .status(400)
        .json({ error: "Recipient and content are required" });
    }

    const message = new Message({
      from: req.user.id,
      to,
      encryptedContent,
    });

    await message.save();

    res.status(201).json({ message: "Message sent securely.", data: message });
  } catch (err) {
    console.error("Send Message Error:", err.message);
    res.status(500).json({ error: "Server error while sending message" });
  }
};

/**
 * @desc    Get all messages for logged-in user (inbox + sent in one array)
 * @route   GET /api/messages
 * @access  Private
 */
exports.getMessages = async (req, res) => {
  try {
    const inbox = await Message.find({ to: req.user.id })
      .populate("from", "name email")
      .lean();

    const sent = await Message.find({ from: req.user.id })
      .populate("to", "name email")
      .lean();

    // Add type so frontend can distinguish
    const formattedInbox = (inbox || []).map((msg) => ({ ...msg, type: "inbox" }));
    const formattedSent = (sent || []).map((msg) => ({ ...msg, type: "sent" }));

    const allMessages = [...formattedInbox, ...formattedSent];

    res.status(200).json(allMessages);
  } catch (err) {
    console.error("Get Messages Error:", err.message);
    res.status(500).json({ error: "Server error while fetching messages" });
  }
};

/**
 * @desc    Get a single message by ID
 * @route   GET /api/messages/:id
 * @access  Private
 */
exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate("from", "name email")
      .populate("to", "name email");

    if (!message) return res.status(404).json({ error: "Message not found" });

    if (
      message.from._id.toString() !== req.user.id &&
      message.to._id.toString() !== req.user.id
    ) {
      return res.status(403).json({ error: "Not authorized to view message" });
    }

    res.status(200).json(message);
  } catch (err) {
    console.error("Get Message By ID Error:", err.message);
    res.status(500).json({ error: "Server error while fetching message" });
  }
};

/**
 * @desc    Delete a message
 * @route   DELETE /api/messages/:id
 * @access  Private
 */
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });

    if (
      message.from.toString() !== req.user.id &&
      message.to.toString() !== req.user.id
    ) {
      return res.status(403).json({ error: "Not authorized to delete" });
    }

    await message.deleteOne();

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error("Delete Message Error:", err.message);
    res.status(500).json({ error: "Server error while deleting message" });
  }
};

/**
 * @desc    Mark a message as read
 * @route   PUT /api/messages/:id/read
 * @access  Private
 */
exports.markAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });

    if (message.to.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to mark as read" });
    }

    message.isRead = true;
    await message.save();

    res.status(200).json({ message: "Message marked as read", data: message });
  } catch (err) {
    console.error("Mark As Read Error:", err.message);
    res.status(500).json({ error: "Server error while marking as read" });
  }
};

