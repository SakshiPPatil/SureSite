// Main controller for general endpoints
const path = require('path');

// Health check endpoint
const root = (req, res) => {
  res.json({ message: 'SureSite API is running!', status: 'healthy' });
};

// Health check endpoint
const healthCheck = (req, res) => {
  res.json({ status: 'healthy', service: 'suresite-backend' });
};

// API v1 status endpoint
const apiStatus = (req, res) => {
  res.json({
    status: 'active',
    version: '1.0.0',
    endpoints: {
      generate: '/api/v1/generate',
      ai: '/api/v1/ai',
      projects: '/api/v1/projects'
    }
  });
};

module.exports = {
  root,
  healthCheck,
  apiStatus
};