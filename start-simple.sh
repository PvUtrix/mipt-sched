#!/bin/sh

echo "🚀 Starting SmartSchedule application..."

# Set environment variables
export NODE_ENV=production
export PORT=${PORT:-3000}
export HOSTNAME=${HOSTNAME:-"0.0.0.0"}

echo "📋 Environment: NODE_ENV=$NODE_ENV, PORT=$PORT, HOSTNAME=$HOSTNAME"

# Check if .next directory exists
if [ ! -d ".next" ]; then
    echo "❌ ERROR: .next directory not found!"
    exit 1
fi

echo "✅ Starting Next.js server..."
if ! npx next start; then
    echo "❌ ERROR: Next.js start failed!"
    exit 1
fi
