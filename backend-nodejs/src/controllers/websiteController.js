// Website generation controller

// Website generation endpoint
const generateWebsite = (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ detail: 'Prompt is required' });
    }
    
    // Placeholder response - in real implementation, this would call AI services
    const response = {
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">
            Generated Website
        </h1>
        <div class="bg-white rounded-lg shadow-lg p-8">
            <p class="text-lg text-gray-700">
                This is a generated website based on your prompt: "${prompt}"
            </p>
            <p class="mt-4 text-gray-600">
                The AI website builder is working! This is a placeholder response.
            </p>
        </div>
    </div>
</body>
</html>
      `,
      css: `
/* Generated CSS styles */
.container {
    max-width: 1200px;
}

.bg-gray-100 {
    background-color: #f3f4f6;
}

.text-blue-600 {
    color: #2563eb;
}
      `,
      js: `
// Generated JavaScript code
console.log('Generated website loaded successfully!');
      `
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ detail: `Error generating website: ${error.message}` });
  }
};

module.exports = {
  generateWebsite
};