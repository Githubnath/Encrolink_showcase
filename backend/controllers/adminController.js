const User = require('../models/User');
const Message = require('../models/Message');
const Contact = require('../models/Contact');

const adminController = {
  // ✅ Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ✅ Get user by ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ✅ Update user role
  updateUserRole: async (req, res) => {
    try {
      const { role } = req.body;
      if (!role) return res.status(400).json({ error: 'Role is required' });

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true }
      ).select('-password');

      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'Role updated successfully', user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ✅ Delete user
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ✅ Get all messages
  getAllMessages: async (req, res) => {
    try {
      const messages = await Message.find().populate('from to', 'name email');
      res.json(messages);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ✅ Delete message
  deleteMessage: async (req, res) => {
    try {
      const message = await Message.findByIdAndDelete(req.params.id);
      if (!message) return res.status(404).json({ error: 'Message not found' });
      res.json({ message: 'Message deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ✅ Get all contact submissions
  getContacts: async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.json(contacts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ✅ System stats
  systemStats: async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const totalMessages = await Message.countDocuments();
      const totalContacts = await Contact.countDocuments();

      res.json({
        totalUsers,
        totalMessages,
        totalContacts,
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = adminController;

