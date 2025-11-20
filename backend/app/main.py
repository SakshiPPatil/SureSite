"""
SureSite Backend - FastAPI Application
AI-Powered Website Builder Backend
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import os
from typing import Dict, Any

# Create FastAPI application
app = FastAPI(
    title="SureSite API",
    description="AI-Powered Website Builder Backend",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/")
async def root():
    """Root endpoint - health check"""
    return {"message": "SureSite API is running!", "status": "healthy"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "suresite-backend"}

# API v1 endpoints
@app.get("/api/v1/status")
async def api_status():
    """API status endpoint"""
    return {
        "status": "active",
        "version": "1.0.0",
        "endpoints": {
            "generate": "/api/v1/generate",
            "ai": "/api/v1/ai",
            "projects": "/api/v1/projects"
        }
    }

# Website generation endpoint
@app.post("/api/v1/generate/generate-website")
async def generate_website(request: Dict[str, Any]):
    """Generate website based on prompt"""
    try:
        prompt = request.get("prompt", "")
        
        if not prompt:
            raise HTTPException(status_code=400, detail="Prompt is required")
        
        # Placeholder response - in real implementation, this would call AI services
        response = {
            "html": f"""
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
                This is a generated website based on your prompt: "{prompt}"
            </p>
            <p class="mt-4 text-gray-600">
                The AI website builder is working! This is a placeholder response.
            </p>
        </div>
    </div>
</body>
</html>
            """,
            "css": """
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
            """,
            "js": """
// Generated JavaScript code
console.log('Generated website loaded successfully!');
            """
        }
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating website: {str(e)}")

# AI Chat endpoint
@app.post("/api/v1/ai/chat")
async def chat_with_ai(request: Dict[str, Any]):
    """Chat with AI for planning and code generation"""
    try:
        message = request.get("message", {})
        history = request.get("history", [])
        
        if not message or not message.get("content"):
            raise HTTPException(status_code=400, detail="Message content is required")
        
        # Placeholder response - in real implementation, this would call AI services
        response = {
            "status": "success",
            "message": {
                "role": "assistant",
                "content": f"I received your message: '{message.get('content')}'. This is a placeholder response from the AI chat endpoint."
            }
        }
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in AI chat: {str(e)}")

# Projects endpoints
@app.get("/api/v1/projects")
async def get_projects(page: int = 0, size: int = 1000):
    """Get all projects"""
    return {
        "projects": [],
        "total": 0,
        "page": page,
        "size": size
    }

@app.post("/api/v1/projects")
async def create_project(project_data: Dict[str, Any]):
    """Create a new project"""
    return {
        "id": 1,
        "name": project_data.get("name", "New Project"),
        "status": "created",
        "message": "Project created successfully"
    }

@app.get("/api/v1/projects/{project_id}")
async def get_project(project_id: int):
    """Get project by ID"""
    return {
        "id": project_id,
        "name": f"Project {project_id}",
        "status": "active"
    }

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"detail": "Endpoint not found"}
    )

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )

if __name__ == "__main__":
    # Get configuration from environment variables
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    debug = os.getenv("DEBUG", "false").lower() == "true"
    
    # Run the application
    uvicorn.run(
        "app.main:app",
        host=host,
        port=port,
        reload=debug,
        log_level="info"
    )
