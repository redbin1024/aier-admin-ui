# ---- 构建阶段 ----
FROM docker.1ms.run/node:20-alpine AS builder

WORKDIR /app

# 安装 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 依赖安装（利用 Docker 缓存分层）
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 源码复制 & 构建
COPY . .
RUN pnpm run build

# ---- 运行阶段 ----
FROM docker.1ms.run/nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80
CMD ["sh", "/docker-entrypoint.sh"]
