const Message = require('../model/Message');

// Get all complaints
exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Message.find({ isComplaint: true })
      .populate('customerId', 'username email')
      .sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints', error });
  }
};

// Get all messages (non-complaints)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ isComplaint: false })
      .populate('customerId', 'username email')
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};

// Mark message as read
exports.markAsRead = async (req, res) => {
  try {
    const messageId = req.params.id;
    const message = await Message.findByIdAndUpdate(messageId, { status: 'read' }, { new: true });
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ message: 'Message marked as read', data: message });
  } catch (error) {
    res.status(500).json({ message: 'Error marking message as read', error });
  }
};

// Delete read messages older than 7 days
exports.deleteOldReadMessages = async (req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const result = await Message.deleteMany({ status: 'read', updatedAt: { $lt: sevenDaysAgo } });
    res.json({ message: 'Old read messages deleted', deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting old read messages', error });
  }
};
