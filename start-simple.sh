#!/bin/sh

echo "Starting SmartSchedule application..."

# Check if server.js exists (standalone mode creates it in the root)
if [ ! -f "server.js" ]; then
    echo "ERROR: server.js not found!"
    echo "Current directory contents:"
    ls -la
echo "Checking .next directory:"
ls -la .next/
echo "Checking if standalone directory exists:"
if [ -d ".next/standalone" ]; then
    echo "Found .next/standalone directory:"
    ls -la .next/standalone/
else
    echo "No .next/standalone directory found"
fi
    echo "Looking for server files:"
    find . -name "*server*" -type f
    echo "Checking if we need to run from .next/standalone:"
    if [ -d ".next/standalone" ]; then
        echo "Found .next/standalone directory:"
        ls -la .next/standalone/
        echo "Trying to run from .next/standalone..."
        cd .next/standalone
        if [ -f "server.js" ]; then
            echo "Found server.js in .next/standalone, continuing..."
        else
            echo "Still no server.js found in .next/standalone"
            echo "Contents of .next/standalone:"
            ls -la
        fi
    fi
    echo "Waiting 30 seconds before exit..."
    sleep 30
    exit 1
fi

# Check if .next directory exists
if [ ! -d ".next" ]; then
    echo "ERROR: .next directory not found!"
    echo "Current directory contents:"
    ls -la
    echo "Waiting 30 seconds before exit..."
    sleep 30
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

echo "Current directory contents:"
ls -la

echo "Starting server..."
# Since we don't have standalone server.js, use Next.js directly
echo "Using npx next start (no standalone server.js found)..."
if ! npx next start; then
    echo "ERROR: Next.js start failed!"
    echo "Waiting 60 seconds before exit..."
    sleep 60
    exit 1
fi
