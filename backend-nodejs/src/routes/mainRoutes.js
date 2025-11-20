const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Health check endpoint
router.get('/', mainController.root);

// Health check endpoint
router.get('/health', mainController.healthCheck);

// API v1 status endpoint
router.get('/api/v1/status', mainController.apiStatus);

module.exports = router;