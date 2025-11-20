// Projects controller

// Get all projects
const getProjects = (req, res) => {
  const { page = 0, size = 1000 } = req.query;
  
  res.json({
    projects: [],
    total: 0,
    page: parseInt(page),
    size: parseInt(size)
  });
};

// Create a new project
const createProject = (req, res) => {
  const { name } = req.body;
  
  res.json({
    id: 1,
    name: name || 'New Project',
    status: 'created',
    message: 'Project created successfully'
  });
};

// Get project by ID
const getProjectById = (req, res) => {
  const { projectId } = req.params;
  
  res.json({
    id: projectId,
    name: `Project ${projectId}`,
    status: 'active'
  });
};

module.exports = {
  getProjects,
  createProject,
  getProjectById
};