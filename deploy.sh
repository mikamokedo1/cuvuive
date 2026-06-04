#!/bin/bash

# Configuration
VPS_IP="180.93.225.157"
VPS_USER="root"
VPS_DIR="/var/www/cuthongminh.com/frontend"
IMAGE_NAME="registry.gitlab.com/mikamokedo/cuthongminh"
IMAGE_TAG="latest"
IMAGE_TAR="/tmp/cuthongminh-web.tar"
VPS_PASS='xAJz?#s5n20b'

echo "🚀 Starting deployment to $VPS_IP..."

# Step 0: Ensure env is set up
ENV_FILE=".env.local"
if [ -f ".env.production" ]; then
    ENV_FILE=".env.production"
fi

if [ ! -f "$ENV_FILE" ]; then
    echo "❌ No .env.local or .env.production file found. NEXT_PUBLIC_* vars won't be set!"
    exit 1
fi

echo "   Using env file: $ENV_FILE"

# Step 1: Build Next.js locally (Mac has more RAM than VPS or Docker Desktop)
echo "📦 Building Next.js + Voice Relay locally (using full Mac RAM)..."
npm run build:all

if [ $? -ne 0 ]; then
    echo "❌ Failed to build Next.js app locally."
    exit 1
fi

# Step 1.5: Build Docker image with pre-built files
echo "🔨 Building Docker image..."

docker build --platform linux/amd64 -t ${IMAGE_NAME}:${IMAGE_TAG} .

if [ $? -ne 0 ]; then
    echo "❌ Failed to build Docker image locally."
    exit 1
fi

echo "✅ Docker image built successfully!"

# Step 2: Save image to tar file
echo "💾 Saving Docker image to tar..."
docker save ${IMAGE_NAME}:${IMAGE_TAG} -o ${IMAGE_TAR}

if [ $? -ne 0 ]; then
    echo "❌ Failed to save Docker image."
    exit 1
fi

echo "✅ Docker image saved! Size: $(du -h ${IMAGE_TAR} | cut -f1)"

# Step 3: Transfer image to VPS
echo "📦 Transferring Docker image to server (this may take a while)..."
sshpass -p "$VPS_PASS" rsync -avz --progress -e "ssh -o StrictHostKeyChecking=no" ${IMAGE_TAR} "$VPS_USER@$VPS_IP:/tmp/"

if [ $? -ne 0 ]; then
    echo "❌ Failed to transfer image to server."
    exit 1
fi

echo "✅ Image transferred successfully!"

# Step 4: Sync docker-compose and env files
echo "📄 Syncing config files to server..."
sshpass -p "$VPS_PASS" rsync -avz -e "ssh -o StrictHostKeyChecking=no" docker-compose.deploy.yml "$VPS_USER@$VPS_IP:$VPS_DIR/"

if [ $? -ne 0 ]; then
    echo "❌ Failed to sync config files."
    exit 1
fi

# Step 5: Stop Watchtower (prevents it from pulling old GHCR image over our local deploy)
echo "🛑 Stopping Watchtower to prevent GHCR overwrite..."
sshpass -p "$VPS_PASS" ssh -o StrictHostKeyChecking=no "$VPS_USER@$VPS_IP" "\
  docker stop watchtower 2>/dev/null; \
  docker rm watchtower 2>/dev/null; \
  echo 'Watchtower stopped'"

# Step 6: Load image and restart container on VPS
echo "🐳 Loading image and starting container on server..."
sshpass -p "$VPS_PASS" ssh -o StrictHostKeyChecking=no "$VPS_USER@$VPS_IP" "\
  docker load -i /tmp/cuthongminh-web.tar && \
  rm -f /tmp/cuthongminh-web.tar && \
  cd $VPS_DIR && \
  docker stop cuthongminh_web 2>/dev/null; \
  docker rm cuthongminh_web 2>/dev/null; \
  docker run -d --name cuthongminh_web \
    --restart unless-stopped \
    -p 3000:3000 \
    -p 8081:8081 \
    -e PORT=3000 \
    -e NODE_ENV=production \
    --env-file .env.production \
    ${IMAGE_NAME}:${IMAGE_TAG}"

if [ $? -ne 0 ]; then
    echo "❌ Failed to start container on server."
    exit 1
fi

# Step 7: Clean up local tar
rm -f ${IMAGE_TAR}

echo "🎉 Deployment completed successfully! Your changes are running on the server."
echo ""
echo "⚠️  Watchtower has been stopped. To re-enable auto-deploy via GitLab CI,"
echo "   run on VPS:"
echo "   cd /var/www/cuthongminh.com/frontend && docker compose -f docker-compose.deploy.yml up -d"
