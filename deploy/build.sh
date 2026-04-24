#!/bin/bash
set -e

# ============================
# aier-admin-ui 一键构建推送脚本
# ============================

# 切换到项目根目录（build.sh 所在目录的上级）
cd "$(dirname "$0")/.."

IMAGE_NAME=registry.cn-shenzhen.aliyuncs.com/lnktech/aier-admin-ui

# 自动递增 patch 版本号（清除 NODE_OPTIONS 避免 Debugger 消息）
NODE_OPTIONS='' npm version patch --no-git-tag-version > /dev/null 2>&1

VERSION=$(node -p "require('./package.json').version")
IMAGE_TAG=${VERSION}

echo "========================================"
echo "  项目: aier-admin-ui"
echo "  版本: ${IMAGE_TAG}"
echo "  镜像: ${IMAGE_NAME}"
echo "========================================"

# 1. 构建 Docker 镜像（指定 linux/amd64 平台，Dockerfile 在 deploy/ 目录）
echo "[1/3] 构建 Docker 镜像..."
docker build --platform linux/amd64 \
  -f deploy/Dockerfile \
  -t ${IMAGE_NAME}:${IMAGE_TAG} \
  -t ${IMAGE_NAME}:latest \
  .

# 2. 推送到阿里云镜像仓库
echo "[2/3] 推送版本标签 ${IMAGE_TAG}..."
docker push ${IMAGE_NAME}:${IMAGE_TAG}

echo "[3/3] 推送 latest 标签..."
docker push ${IMAGE_NAME}:latest

echo "========================================"
echo "  ✅ 构建推送完成!"
echo "  镜像: ${IMAGE_NAME}:${IMAGE_TAG}"
echo ""
echo "  服务器部署:"
echo "  docker pull ${IMAGE_NAME}:latest"
echo "  docker run -d \\"
echo "    --name aier-admin-ui \\"
echo "    -p 80:80 \\"
echo "    -e API_BACKEND_URL=https://your-api-server.com \\"
echo "    --restart unless-stopped \\"
echo "    ${IMAGE_NAME}:latest"
echo "========================================"
