#!/bin/bash

# Configuration
VPS_IP="180.93.225.157"
VPS_USER="root"
VPS_DIR="/var/www/cuthongminh.com/frontend"

echo "🚀 Starting deployment to $VPS_IP..."

# Step 1: Sync files to the VPS
echo "📦 Syncing files to server..."
rsync -avz \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  --exclude '.env*' \
  --exclude 'deploy.sh' \
  ./ "$VPS_USER@$VPS_IP:$VPS_DIR"

if [ $? -ne 0 ]; then
    echo "❌ Failed to sync files to server."
    exit 1
fi

echo "✅ Files synced successfully!"

# Step 2: SSH into VPS and rebuild Docker container
echo "🐳 Rebuilding and starting Docker container on server..."
ssh "$VPS_USER@$VPS_IP" "cd $VPS_DIR && docker compose -f docker-compose.deploy.yml up -d --build"

if [ $? -ne 0 ]; then
    echo "❌ Failed to rebuild Docker container."
    exit 1
fi

echo "🎉 Deployment completed successfully! Your changes are running on the server."
