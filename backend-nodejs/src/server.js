const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const mainRoutes = require('./routes/mainRoutes');
const websiteRoutes = require('./routes/websiteRoutes');
const aiRoutes = require('./routes/aiRoutes');
const projectsRoutes = require('./routes/projectsRoutes');
const pagebuilderRoutes = require('./routes/pagebuilderRoutes');

// Create Express app
const app = express();
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || '0.0.0.0';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes (order matters - specific routes first)
app.use('/api', pagebuilderRoutes);
app.use('/api', websiteRoutes);
app.use('/api', aiRoutes);
app.use('/api', projectsRoutes);

// General routes
app.use('/', mainRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ detail: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ detail: 'Endpoint not found' });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`SureSite Backend is running on http://${HOST}:${PORT}`);
});

module.exports = app;