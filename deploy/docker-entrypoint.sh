#!/bin/sh

set -e

CONF="/etc/nginx/conf.d/default.conf"

# ---- 1. 动态注入 DNS resolver ----
NAMESERVERS=$(grep "nameserver" /etc/resolv.conf | awk '{print $2}' | tr '\n' ' ')
sed -i "s|__NAMESERVERS__|${NAMESERVERS}|g" "$CONF"

# ---- 2. 动态注入 API 后端地址 ----
# 默认后端地址（生产环境），可通过 docker run -e API_BACKEND_URL=xxx 覆盖
API_BACKEND_URL="${API_BACKEND_URL:-https://admin-api.xiaodingdang1.com}"
sed -i "s|__API_BACKEND_URL__|${API_BACKEND_URL}|g" "$CONF"

echo "========================================"
echo "  Nginx 启动"
echo "  API 后端: ${API_BACKEND_URL}"
echo "  DNS:      ${NAMESERVERS}"
echo "========================================"

# ---- 3. 前台启动 Nginx ----
nginx -g "daemon off;"
