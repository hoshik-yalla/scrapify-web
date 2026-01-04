#!/bin/bash

# Scrapify - Full Stack Startup Script

echo "🚀 Starting Scrapify..."
echo ""

# Activate Node environment
echo "📦 Activating Node environment..."
source ./misc/nvenv/bin/activate

# Start backend in background
echo "🔧 Starting backend server..."
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 2

# Start frontend
echo "🎨 Starting frontend..."
cd scrapify
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Scrapify is running!"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait
