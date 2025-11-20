const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

// Projects endpoints
router.get('/api/v1/projects', projectsController.getProjects);
router.post('/api/v1/projects', projectsController.createProject);
router.get('/api/v1/projects/:projectId', projectsController.getProjectById);

module.exports = router;