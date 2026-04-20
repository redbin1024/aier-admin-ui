# aier-admin-ui Docker 部署指南

## 目录结构

```
deploy/
├── Dockerfile              # 多阶段构建（node 构建 → nginx 运行）
├── nginx.conf              # Nginx 配置（gzip / SPA / API 反向代理）
├── docker-entrypoint.sh    # 启动脚本（动态注入 DNS + API 后端地址）
├── build.sh                # 一键构建 & 推送脚本
└── README.md               # 本文档
```

> 项目根目录还有一个 `.dockerignore` 文件（Docker 要求必须位于构建上下文根目录）。

---

## 快速开始

### 1. 构建 & 推送

```bash
# 在项目任意位置执行均可，脚本会自动切换到项目根目录
./deploy/build.sh
```

脚本将自动：

- 从 `package.json` 读取版本号
- 构建 `linux/amd64` 平台镜像
- 推送 **版本号** + **latest** 双标签到阿里云镜像仓库

### 2. 服务器部署

```bash
# 拉取镜像
docker pull registry.cn-shenzhen.aliyuncs.com/lnktech/aier-admin-ui:latest

# 运行容器
docker run -d \
  --name aier-admin-ui \
  -p 80:80 \
  -e API_BACKEND_URL=https://your-api-server.com \
  --restart unless-stopped \
  registry.cn-shenzhen.aliyuncs.com/lnktech/aier-admin-ui:latest
```

### 3. 更新部署

```bash
docker pull registry.cn-shenzhen.aliyuncs.com/lnktech/aier-admin-ui:latest
docker stop aier-admin-ui && docker rm aier-admin-ui
docker run -d \
  --name aier-admin-ui \
  -p 80:80 \
  -e API_BACKEND_URL=https://your-api-server.com \
  --restart unless-stopped \
  registry.cn-shenzhen.aliyuncs.com/lnktech/aier-admin-ui:latest
```

---

## 环境变量

| 变量              | 说明             | 默认值                           |
| ----------------- | ---------------- | -------------------------------- |
| `API_BACKEND_URL` | API 后端服务地址 | `https://test.xiaodingdang1.com` |

> 通过环境变量切换不同后端环境，无需重新构建镜像。

---

## 镜像信息

| 项目     | 值                                                        |
| -------- | --------------------------------------------------------- |
| 镜像仓库 | `registry.cn-shenzhen.aliyuncs.com/lnktech/aier-admin-ui` |
| 基础镜像 | `docker.1ms.run/nginx:alpine`                             |
| 构建镜像 | `docker.1ms.run/node:20-alpine`                           |
| 暴露端口 | `80`                                                      |

---

## 架构说明

```
┌─────────────────────────────────────────────┐
│              Docker 容器 (:80)              │
│                                             │
│  docker-entrypoint.sh                       │
│    ├── 注入 DNS resolver                    │
│    └── 注入 API_BACKEND_URL                 │
│                                             │
│  Nginx                                      │
│    ├── /           → SPA 静态文件 (dist/)   │
│    ├── /assets/*   → 长缓存 (1年+immutable) │
│    └── /api/*      → 反向代理 → 后端服务    │
└─────────────────────────────────────────────┘
```

## 注意事项

- Mac (ARM) 构建需 `--platform linux/amd64`（脚本已内置）
- HTTPS 通常由外部网关 / 负载均衡器处理，容器仅监听 80
- 如需自定义镜像名称，修改 `build.sh` 中的 `IMAGE_NAME` 变量
