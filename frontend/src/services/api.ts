// API service for SureSite backend integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Generic API request function
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

// Website generation (existing functionality)
export async function generateWebsite(prompt: string) {
  try {
    const response = await apiRequest('/api/v1/generate/generate-website', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });
    
    return {
      html: response.html || '<div>Generated HTML content</div>',
      css: response.css || '/* Generated CSS styles */',
      js: response.js || '// Generated JavaScript code',
    };
  } catch (error) {
    console.error('Error generating website:', error);
    throw error;
  }
}

// Chat API (planning + code)
export async function chatWithAI(message: string, history: Array<{ role: string; content: string }> = []) {
  const response = await apiRequest('/api/v1/ai/chat', {
    method: 'POST',
    body: JSON.stringify({ message: { role: 'user', content: message }, history }),
  });
  return response; // { status, message?, plan?, code? }
}

// Gemini chat (client-side) - generates complete index.html
export async function geminiChat(prompt: string, history: Array<{ role: string; content: string }>, apiKey: string) {
  // Check if API key is provided
  if (!apiKey) {
    throw new Error('Gemini API key is not configured');
  }
  
  // Use gemini-2.5-pro which we've confirmed works
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${encodeURIComponent(apiKey)}`;
  
  // Enhanced prompt for complete HTML generation
  const enhancedPrompt = `You are a professional web developer. Create a complete, modern website based on this description: "${prompt}"

Generate ONLY a complete HTML file with this exact structure:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Website Title</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Any additional CSS here */
    </style>
</head>
<body>
    <!-- Complete HTML content here -->
    <script>
        // Any JavaScript here
    </script>
</body>
</html>

Requirements:
- Use Tailwind CSS for styling (already included)
- Make it responsive and modern
- Include proper semantic HTML structure
- Add interactive elements if appropriate
- Keep it clean and professional
- Use modern design patterns
- Include a descriptive title
- Add meta tags for SEO

Respond ONLY with the complete HTML file, no other text or JSON.`;

  const parts: any[] = [];
  history.forEach(h => {
    parts.push({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.content }] });
  });
  parts.push({ role: 'user', parts: [{ text: enhancedPrompt }] });
  
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: parts }),
    });
    
    if (!res.ok) {
      // Log more detailed error information
      console.error('Gemini API error:', res.status, res.statusText);
      const errorText = await res.text();
      console.error('Error details:', errorText);
      throw new Error(`Gemini request failed: ${res.status} - ${res.statusText}. ${errorText}`);
    }
    
    const data = await res.json();
    const htmlContent = data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join('\n') || '';
    
    // Check if response looks like HTML
    if (htmlContent.trim().startsWith('<!DOCTYPE html>') || htmlContent.trim().startsWith('<html')) {
      return { 
        text: 'Complete HTML website generated! You can now edit the code and see live preview.',
        html: htmlContent
      };
    }
    
    return { text: htmlContent };
  } catch (error) {
    console.error('Gemini API network error:', error);
    throw error;
  }
}

// Multi-page site/prototype APIs
export async function generateSite(prompt: string, style: string = 'modern') {
  const response = await apiRequest('/api/v1/generate/site', {
    method: 'POST',
    body: JSON.stringify({ prompt, style }),
  });
  return response; // PrototypeResponse
}

export async function forkSite(from_prototype_id: string, overrides?: { prompt?: string; style?: string; label?: string }) {
  const response = await apiRequest('/api/v1/generate/site/fork', {
    method: 'POST',
    body: JSON.stringify({ from_prototype_id, ...(overrides || {}) }),
  });
  return response; // PrototypeResponse
}

export async function getSite(prototype_id: string) {
  return apiRequest(`/api/v1/generate/site/${prototype_id}`);
}

export async function updatePage(prototype_id: string, page_id: string, data: any) {
  return apiRequest(`/api/v1/generate/site/${prototype_id}/pages/${page_id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// Project Management API
export const projectsAPI = {
  // Get all projects
  getAll: (page = 0, size = 1000) => 
    apiRequest(`/api/v1/projects?page=${page}&size=${size}`),
  
  // Get project by ID
  getById: (id: number) => 
    apiRequest(`/api/v1/projects/${id}`),
  
  // Create new project
  create: (projectData: any) => 
    apiRequest('/api/v1/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    }),
  
  // Update project
  update: (id: number, projectData: any) => 
    apiRequest(`/api/v1/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    }),
  
  // Delete project
  delete: (id: number) => 
    apiRequest(`/api/v1/projects/${id}`, {
      method: 'DELETE',
    }),
  
  // Get project statistics
  getStats: (id: number) => 
    apiRequest(`/api/v1/projects/${id}/stats`),
  
  // Copy project
  copy: (id: number, copyData: any) => 
    apiRequest(`/api/v1/projects/${id}/copy`, {
      method: 'POST',
      body: JSON.stringify(copyData),
    }),
};

// Wireframe/Form Builder API
export const wireframesAPI = {
  // Get wireframes for a module
  getByModule: (moduleId: number, page = 0, size = 1000) => 
    apiRequest(`/api/v1/wireframe?module_id=${moduleId}&page=${page}&size=${size}`),
  
  // Get wireframe by ID
  getById: (id: number) => 
    apiRequest(`/api/v1/wireframe/${id}`),
  
  // Get wireframe with lines
  getWithLines: (id: number) => 
    apiRequest(`/api/v1/wireframe/${id}/lines`),
  
  // Create new wireframe
  create: (wireframeData: any) => 
    apiRequest('/api/v1/wireframe', {
      method: 'POST',
      body: JSON.stringify(wireframeData),
    }),
  
  // Update wireframe
  update: (id: number, wireframeData: any) => 
    apiRequest(`/api/v1/wireframe/${id}`, {
      method: 'PUT',
      body: JSON.stringify(wireframeData),
    }),
  
  // Delete wireframe
  delete: (id: number) => 
    apiRequest(`/api/v1/wireframe/${id}`, {
      method: 'DELETE',
    }),
  
  // Copy wireframe
  copy: (id: number, copyData: any) => 
    apiRequest(`/api/v1/wireframe/${id}/copy`, {
      method: 'POST',
      body: JSON.stringify(copyData),
    }),
  
  // Form Templates
  getTemplates: (category?: string) => 
    apiRequest(`/api/v1/form-templates/templates${category ? `?category=${category}` : ''}`),
  
  getTemplateById: (id: number) => 
    apiRequest(`/api/v1/form-templates/templates/${id}`),
  
  createTemplate: (templateData: any) => 
    apiRequest('/api/v1/form-templates/templates', {
      method: 'POST',
      body: JSON.stringify(templateData),
    }),
  
  updateTemplate: (id: number, templateData: any) => 
    apiRequest(`/api/v1/form-templates/templates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(templateData),
    }),
  
  deleteTemplate: (id: number) => 
    apiRequest(`/api/v1/form-templates/templates/${id}`, {
      method: 'DELETE',
    }),
};

// Reports API
export const reportsAPI = {
  // Get reports for a project
  getByProject: (projectId: number, page = 0, size = 1000) => 
    apiRequest(`/api/v1/reports?project_id=${projectId}&page=${page}&size=${size}`),
  
  // Get report by ID
  getById: (id: number) => 
    apiRequest(`/api/v1/reports/${id}`),
  
  // Create new report
  create: (reportData: any) => 
    apiRequest('/api/v1/reports', {
      method: 'POST',
      body: JSON.stringify(reportData),
    }),
  
  // Update report
  update: (id: number, reportData: any) => 
    apiRequest(`/api/v1/reports/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reportData),
    }),
  
  // Delete report
  delete: (id: number) => 
    apiRequest(`/api/v1/reports/${id}`, {
      method: 'DELETE',
    }),
  
  // Execute report
  execute: (id: number, params?: any) => 
    apiRequest(`/api/v1/reports/${id}/execute`, {
      method: 'POST',
      body: JSON.stringify(params || {}),
    }),
  
  // Export report
  export: (id: number, format: string, params?: any) => 
    apiRequest(`/api/v1/reports/${id}/export`, {
      method: 'POST',
      body: JSON.stringify({ format, ...params }),
    }),
};

// Dashboards API
export const dashboardsAPI = {
  // Get dashboards for a project
  getByProject: (projectId: number, page = 0, size = 1000) => 
    apiRequest(`/api/v1/dashboards?project_id=${projectId}&page=${page}&size=${size}`),
  
  // Get dashboard by ID
  getById: (id: number) => 
    apiRequest(`/api/v1/dashboards/${id}`),
  
  // Create new dashboard
  create: (dashboardData: any) => 
    apiRequest('/api/v1/dashboards', {
      method: 'POST',
      body: JSON.stringify(dashboardData),
    }),
  
  // Update dashboard
  update: (id: number, dashboardData: any) => 
    apiRequest(`/api/v1/dashboards/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dashboardData),
    }),
  
  // Delete dashboard
  delete: (id: number) => 
    apiRequest(`/api/v1/dashboards/${id}`, {
      method: 'DELETE',
    }),
  
  // Refresh dashboard
  refresh: (id: number) => 
    apiRequest(`/api/v1/dashboards/${id}/refresh`, {
      method: 'POST',
    }),
  
  // Update dashboard layout
  updateLayout: (id: number, layoutData: any) => 
    apiRequest(`/api/v1/dashboards/${id}/layout`, {
      method: 'PUT',
      body: JSON.stringify(layoutData),
    }),
};

// User Management API
export const usersAPI = {
  // Get all users
  getAll: (page = 0, size = 1000) => 
    apiRequest(`/api/v1/users?page=${page}&size=${size}`),
  
  // Get user by ID
  getById: (id: number) => 
    apiRequest(`/api/v1/users/${id}`),
  
  // Create new user
  create: (userData: any) => 
    apiRequest('/api/v1/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  // Update user
  update: (id: number, userData: any) => 
    apiRequest(`/api/v1/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
  
  // Delete user
  delete: (id: number) => 
    apiRequest(`/api/v1/users/${id}`, {
      method: 'DELETE',
    }),
  
  // Get user profile
  getProfile: () => 
    apiRequest('/api/v1/user-profile/profile'),
  
  // Update user profile
  updateProfile: (profileData: any) => 
    apiRequest('/api/v1/user-profile/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),
};

// Authentication API
export const authAPI = {
  // Login
  login: (credentials: { username: string; password: string }) => 
    apiRequest('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  // Register
  register: (userData: any) => 
    apiRequest('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  // Logout
  logout: () => 
    apiRequest('/api/v1/auth/logout', {
      method: 'POST',
    }),
  
  // Forgot password
  forgotPassword: (email: string) => 
    apiRequest('/api/v1/forgot-password/forgot', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
  
  // Reset password
  resetPassword: (token: string, newPassword: string) => 
    apiRequest('/api/v1/forgot-password/reset', {
      method: 'POST',
      body: JSON.stringify({ token, new_password: newPassword }),
    }),
  
  // Change password
  changePassword: (currentPassword: string, newPassword: string) => 
    apiRequest('/api/v1/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ 
        current_password: currentPassword, 
        new_password: newPassword 
      }),
    }),
};

// Menu Management API
export const menuAPI = {
  // Get user menus
  getUserMenus: () => 
    apiRequest('/api/v1/realnet-menu/user-menus'),
  
  // Get all menus
  getAll: () => 
    apiRequest('/api/v1/realnet-menu/menus'),
  
  // Create menu
  create: (menuData: any) => 
    apiRequest('/api/v1/realnet-menu/menus', {
      method: 'POST',
      body: JSON.stringify(menuData),
    }),
  
  // Update menu
  update: (id: number, menuData: any) => 
    apiRequest(`/api/v1/realnet-menu/menus/${id}`, {
      method: 'PUT',
      body: JSON.stringify(menuData),
    }),
  
  // Delete menu
  delete: (id: number) => 
    apiRequest(`/api/v1/realnet-menu/menus/${id}`, {
      method: 'DELETE',
    }),
};

// Technology Stack API
export const techStackAPI = {
  // Get all technology stacks
  getAll: () => 
    apiRequest('/api/v1/technology-stack/tech-stacks'),
  
  // Create technology stack
  create: (techStackData: any) => 
    apiRequest('/api/v1/technology-stack/tech-stacks', {
      method: 'POST',
      body: JSON.stringify(techStackData),
    }),
  
  // Update technology stack
  update: (id: number, techStackData: any) => 
    apiRequest(`/api/v1/technology-stack/tech-stacks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(techStackData),
    }),
  
  // Delete technology stack
  delete: (id: number) => 
    apiRequest(`/api/v1/technology-stack/tech-stacks/${id}`, {
      method: 'DELETE',
    }),
};

// Export all APIs
export default {
  generateWebsite,
  chatWithAI,
  projects: projectsAPI,
  wireframes: wireframesAPI,
  reports: reportsAPI,
  dashboards: dashboardsAPI,
  users: usersAPI,
  auth: authAPI,
  menu: menuAPI,
  techStack: techStackAPI,
};