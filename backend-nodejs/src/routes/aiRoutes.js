const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// AI Chat endpoint
router.post('/api/v1/ai/chat', aiController.chatWithAI);

module.exports = router;