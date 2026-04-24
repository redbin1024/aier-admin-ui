@echo off
setlocal enabledelayedexpansion

REM ============================
REM aier-admin-ui 一键构建推送脚本 (Windows)
REM ============================

REM 切换到项目根目录（build.bat 所在目录的上级）
cd /d "%~dp0.."

set IMAGE_NAME=registry.cn-shenzhen.aliyuncs.com/lnktech/aier-admin-ui

REM 自动递增 patch 版本号（清除 NODE_OPTIONS 避免 Debugger 消息）
set NODE_OPTIONS=
npm version patch --no-git-tag-version > nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm version patch 失败，请检查 package.json 是否存在
    exit /b 1
)

REM 从 package.json 读取版本号
for /f "delims=" %%v in ('node -p "require('./package.json').version"') do set VERSION=%%v
set IMAGE_TAG=%VERSION%

echo ========================================
echo   项目: aier-admin-ui
echo   版本: %IMAGE_TAG%
echo   镜像: %IMAGE_NAME%
echo ========================================

REM 1. 构建 Docker 镜像（指定 linux/amd64 平台，Dockerfile 在 deploy/ 目录）
echo [1/3] 构建 Docker 镜像...
docker build --platform linux/amd64 ^
  -f deploy/Dockerfile ^
  -t %IMAGE_NAME%:%IMAGE_TAG% ^
  -t %IMAGE_NAME%:latest ^
  .
if %errorlevel% neq 0 (
    echo [ERROR] Docker 构建失败
    exit /b 1
)

REM 2. 推送到阿里云镜像仓库
echo [2/3] 推送版本标签 %IMAGE_TAG%...
docker push %IMAGE_NAME%:%IMAGE_TAG%
if %errorlevel% neq 0 (
    echo [ERROR] 推送版本标签失败，请确认已登录: docker login registry.cn-shenzhen.aliyuncs.com
    exit /b 1
)

echo [3/3] 推送 latest 标签...
docker push %IMAGE_NAME%:latest
if %errorlevel% neq 0 (
    echo [ERROR] 推送 latest 标签失败
    exit /b 1
)

echo ========================================
echo   构建推送完成!
echo   镜像: %IMAGE_NAME%:%IMAGE_TAG%
echo.
echo   服务器部署:
echo   docker pull %IMAGE_NAME%:latest
echo   docker run -d ^
echo     --name aier-admin-ui ^
echo     -p 80:80 ^
echo     -e API_BACKEND_URL=https://your-api-server.com ^
echo     --restart unless-stopped ^
echo     %IMAGE_NAME%:latest
echo ========================================

endlocal
