const express = require('express');
const router = express.Router();
const websiteController = require('../controllers/websiteController');

// Website generation endpoint
router.post('/api/v1/generate/generate-website', websiteController.generateWebsite);

module.exports = router;