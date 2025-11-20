# Frontend Startup Script for SureSite

Write-Host "=== SureSite Frontend Startup ===" -ForegroundColor Green
Write-Host ""

# Navigate to frontend directory
Set-Location "C:\Programming\SureSite\SureSite\frontend"

# Install dependencies if needed
Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
npm install

# Set environment variable for API URL
$env:NEXT_PUBLIC_API_URL = "http://127.0.0.1:8000"

Write-Host ""
Write-Host "Starting frontend server on http://localhost:3000" -ForegroundColor Green
Write-Host "Make sure the backend is running on http://127.0.0.1:8000" -ForegroundColor Yellow
Write-Host ""

# Start frontend server
npm run dev
