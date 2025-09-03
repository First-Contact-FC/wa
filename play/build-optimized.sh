#!/bin/bash

# Memory-optimized build script for WorkAdventure Play
# This script builds the application in stages to reduce memory usage

set -e

echo "🚀 Starting memory-optimized build for WorkAdventure Play..."

# Set memory-optimized Node options
export NODE_OPTIONS="--max-old-space-size=8192 --optimize-for-size --gc-interval=100"

# Stage 1: Generate i18n files
echo "📝 Stage 1: Generating i18n files..."
npm run typesafe-i18n

# Stage 2: Build iframe API
echo "🔧 Stage 2: Building iframe API..."
npm run build-iframe-api

# Stage 3: Build main application with memory optimization
echo "🏗️ Stage 3: Building main application..."
echo "Using NODE_OPTIONS: $NODE_OPTIONS"

# Set Sentry environment variables (with fallbacks)
export SENTRY_RELEASE=${SENTRY_RELEASE:-"dev"}
export SENTRY_URL=${SENTRY_URL:-""}
export SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN:-""}
export SENTRY_ORG=${SENTRY_ORG:-""}
export SENTRY_PROJECT=${SENTRY_PROJECT:-""}
export SENTRY_ENVIRONMENT=${SENTRY_ENVIRONMENT:-"development"}

# Build with memory optimization
npm run build

echo "✅ Memory-optimized build completed successfully!"
echo "📊 Build artifacts created in dist/ directory"

