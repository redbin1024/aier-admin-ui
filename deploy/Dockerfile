# syntax=docker/dockerfile:1.4
# ---- 构建阶段 ----
FROM node:22.12.0-bookworm-slim AS builder

WORKDIR /app

# 安装 pnpm（避免 corepack 在网络不稳定时拉取失败）
ENV NPM_CONFIG_REGISTRY=https://registry.npmmirror.com
RUN npm config set registry ${NPM_CONFIG_REGISTRY} \
  && npm config set fetch-retries 5 \
  && npm config set fetch-retry-factor 2 \
  && npm config set fetch-retry-mintimeout 10000 \
  && npm config set fetch-retry-maxtimeout 60000 \
  && npm i -g pnpm@9

# 加速依赖下载（国内环境可用）
RUN pnpm config set registry https://registry.npmmirror.com \
  && pnpm config set fetch-retries 5 \
  && pnpm config set fetch-retry-factor 2 \
  && pnpm config set fetch-retry-mintimeout 10000 \
  && pnpm config set fetch-retry-maxtimeout 60000

# 依赖安装（利用 Docker 缓存分层）
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
  pnpm install --frozen-lockfile

# 源码复制 & 构建
COPY . .
RUN pnpm run build

# ---- 运行阶段 ----
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80
CMD ["sh", "/docker-entrypoint.sh"]
