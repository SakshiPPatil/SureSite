const express = require('express');
const router = express.Router();
const pagebuilderController = require('../controllers/pagebuilderController');

// Export to pagebuilder endpoint
router.post('/export-to-pagebuilder', pagebuilderController.exportToPageBuilder);

// Save website to directory endpoint
router.post('/save-website', pagebuilderController.saveWebsite);

module.exports = router;