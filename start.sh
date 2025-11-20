#!/bin/bash

# SureSite Startup Script
echo "🚀 Starting SureSite - AI-Powered Website Builder"
echo "=================================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv .venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source .venv/bin/activate

# Install Python dependencies
echo "📦 Installing Python dependencies..."
cd backend
pip install -r requirements.txt
cd ..

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
cd frontend
npm install
cd ..

# Create .env files if they don't exist
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend .env file..."
    cat > backend/.env << EOF
DATABASE_URL=sqlite:///./app.db
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
LLM_PROXY_TARGET=
EOF
    echo "⚠️  Please update backend/.env with your API keys"
fi

if [ ! -f "frontend/.env.local" ]; then
    echo "📝 Creating frontend .env.local file..."
    cat > frontend/.env.local << EOF
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
EOF
fi

echo ""
echo "🎉 Setup complete! Starting servers..."
echo ""

# Start backend server in background
echo "🔧 Starting backend server on http://localhost:8000"
cd backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "🎨 Starting frontend server on http://localhost:3000"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ SureSite is now running!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all servers"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for background processes
wait
