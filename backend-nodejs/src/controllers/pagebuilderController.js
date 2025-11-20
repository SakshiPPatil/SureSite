// Pagebuilder integration controller

const fs = require('fs');
const path = require('path');

// Function to export a page to the pagebuilder
const exportToPageBuilder = (req, res) => {
  try {
    const { title, path: pagePath, html, css, js } = req.body;
    
    // Validate required fields
    if (!title || !html) {
      return res.status(400).json({ error: 'Title and HTML are required' });
    }
    
    // Path to the pagebuilder database file
    const pagebuilderPath = path.join(__dirname, '..', '..', '..', 'pagebuilder', 'database.json');
    
    // Read the existing database
    let database = {};
    if (fs.existsSync(pagebuilderPath)) {
      const databaseContent = fs.readFileSync(pagebuilderPath, 'utf8');
      database = JSON.parse(databaseContent);
    }
    
    // Generate a unique path if not provided
    const pagePathToUse = pagePath && pagePath !== '/' ? pagePath : `/page-${Date.now()}`;
    
    // Create the page data structure for Puck
    const pageData = {
      root: {
        props: {
          title: title
        }
      },
      content: [
        {
          type: "CustomHtmlBlock",
          props: {
            id: `CustomHtmlBlock-${Date.now()}`,
            html: html,
            css: css || '',
            js: js || ''
          }
        }
      ],
      zones: {}
    };
    
    // Add the new page to the database
    database[pagePathToUse] = pageData;
    
    // Write the updated database back to file
    fs.writeFileSync(pagebuilderPath, JSON.stringify(database, null, 2));
    
    res.json({ 
      success: true, 
      message: 'Page exported to pagebuilder successfully',
      path: pagePathToUse
    });
  } catch (error) {
    console.error('Error exporting to pagebuilder:', error);
    res.status(500).json({ error: 'Failed to export to pagebuilder' });
  }
};

// Function to save website to a directory
const saveWebsite = (req, res) => {
  try {
    const { pageId, html, css, js } = req.body;
    
    // Validate required fields
    if (!pageId || !html) {
      return res.status(400).json({ error: 'Page ID and HTML are required' });
    }
    
    // Create websites directory if it doesn't exist
    const websitesDir = path.join(__dirname, '..', '..', '..', 'websites');
    if (!fs.existsSync(websitesDir)) {
      fs.mkdirSync(websitesDir, { recursive: true });
    }
    
    // Create page-specific directory
    const pageDir = path.join(websitesDir, `page-${pageId}`);
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }
    
    // Create complete HTML file
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Website - ${pageId}</title>
    <style>
        ${css || ''}
    </style>
</head>
<body>
    ${html}
    <script>
        ${js || ''}
    </script>
</body>
</html>`;
    
    // Save HTML file
    const htmlFilePath = path.join(pageDir, 'index.html');
    fs.writeFileSync(htmlFilePath, htmlContent);
    
    // Save CSS file if provided
    if (css) {
      const cssFilePath = path.join(pageDir, 'styles.css');
      fs.writeFileSync(cssFilePath, css);
    }
    
    // Save JS file if provided
    if (js) {
      const jsFilePath = path.join(pageDir, 'script.js');
      fs.writeFileSync(jsFilePath, js);
    }
    
    res.json({ 
      success: true, 
      message: 'Website saved successfully',
      path: pageDir
    });
  } catch (error) {
    console.error('Error saving website:', error);
    res.status(500).json({ error: 'Failed to save website' });
  }
};

module.exports = {
  exportToPageBuilder,
  saveWebsite
};