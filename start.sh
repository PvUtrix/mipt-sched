#!/bin/bash

echo "Starting SmartSchedule application..."

# Check if server.js exists
if [ ! -f "server.js" ]; then
    echo "ERROR: server.js not found!"
    ls -la
    exit 1
fi

# Check if .next directory exists
if [ ! -d ".next" ]; then
    echo "ERROR: .next directory not found!"
    ls -la
    exit 1
fi

# Set environment variables
export NODE_ENV=production
export PORT=${PORT:-3000}
export HOSTNAME=${HOSTNAME:-"0.0.0.0"}

echo "Environment:"
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"
echo "HOSTNAME: $HOSTNAME"

echo "Starting server..."
node server.js
