const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    messageId: { type: String, required: true, unique: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['unread', 'read'], default: 'unread' },
    isComplaint: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
