# Docker Deployment Instructions

## Prerequisites
- Docker and Docker Compose installed on your system

## Deployment Steps

1. **Configure API Keys**
   - Edit the `.env` file in the project root directory
   - Replace the placeholder values with your actual API keys:
     ```
     OPENAI_API_KEY=sk-your-actual-openai-key-here
     ANTHROPIC_API_KEY=your-actual-anthropic-key-here
     NEXT_PUBLIC_GEMINI_API_KEY=your-actual-gemini-key-here
     ```

2. **Build and Start Containers**
   ```bash
   docker-compose up --build
   ```

3. **Access the Application**
   - Frontend: http://localhost:5029
   - Backend API: http://localhost:5028
   - API Documentation: http://localhost:5028/docs

## Environment Variables

### Backend
- `OPENAI_API_KEY`: Your OpenAI API key for AI features
- `ANTHROPIC_API_KEY`: Your Anthropic API key for AI features
- `DATABASE_URL`: Database connection string (default: sqlite:///./app.db)

### Frontend
- `NEXT_PUBLIC_API_BASE_URL`: URL to the backend API (default: http://myapp-backend:8000 in Docker)
- `NEXT_PUBLIC_GEMINI_API_KEY`: Your Google Gemini API key for AI features (optional)

> **Note**: To use the Gemini AI features, you need to obtain a Gemini API key from [Google AI Studio](https://aistudio.google.com/). If you don't configure the Gemini API key, the application will automatically fall back to using the backend AI services.

## Stopping the Application
```bash
docker-compose down
```

## Troubleshooting

If you encounter issues:
1. Ensure your API keys are correctly set in the `.env` file
2. Check that the ports 5028 and 5029 are not already in use
3. Verify Docker and Docker Compose are properly installed and running