 const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// GET complaints
router.get('/complaints', messageController.getComplaints);

// GET messages
router.get('/messages', messageController.getMessages);

// POST mark message as read
router.post('/read/:id', messageController.markAsRead);

// DELETE old read messages
router.delete('/cleanup', messageController.deleteOldReadMessages);

module.exports = router;
