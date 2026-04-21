# 🎲 飞行棋骰子助手

语音触发的 3D 骰子，由 Cloudflare Worker + Groq Whisper 驱动。

## 部署步骤

### 1. 部署 Cloudflare Worker

```bash
cd worker
npm install

# 设置 Groq API Key（交互式，Key 不会写入任何文件）
npx wrangler secret put GROQ_API_KEY

# 发布
npm run deploy
```

部署成功后终端会输出 Worker URL，格式类似：
```
https://dice-app-worker.<你的子域>.workers.dev
```

### 2. 配置前端 Worker URL

打开 `frontend/index.html`，找到顶部常量：

```js
const WORKER_URL = 'https://dice-app-worker.YOUR_SUBDOMAIN.workers.dev';
```

将 `YOUR_SUBDOMAIN` 替换为你实际的子域名。

### 3. 部署前端到 Cloudflare Pages

**方法 A — 拖拽上传（最简单）**

1. 打开 [Cloudflare Pages Dashboard](https://dash.cloudflare.com/) → Pages → Create a project
2. 选择「Direct Upload」
3. 将 `frontend/` 目录拖入上传区域

**方法 B — 连接 Git 仓库**

1. 将项目推送到 GitHub/GitLab
2. Pages → Create project → Connect to Git
3. 构建配置：
   - Build command：（留空）
   - Build output directory：`frontend`

### 4. （可选）收窄 CORS 来源

Worker 部署并确认 Pages 域名后，将 `worker/src/index.ts` 中的：

```ts
'Access-Control-Allow-Origin': '*',
```

改为：

```ts
'Access-Control-Allow-Origin': 'https://your-app.pages.dev',
```

然后重新 `npm run deploy`。

## 本地开发

```bash
# Worker 本地调试
cd worker
npm run dev
# 默认监听 http://localhost:8787

# 前端直接用浏览器打开 frontend/index.html
# 注意：本地需将 WORKER_URL 改为 http://localhost:8787
```

## 触发词

说出以下任意词语即可让机器人扔骰子：

> 你扔 / 轮到你 / 该你 / 到你了 / 你来 / 机器人扔 / 机器人你扔

## 项目结构

```
my-dice-app/
├── frontend/
│   └── index.html          # 前端单文件（CSS 3D 骰子 + 语音识别）
└── worker/
    ├── src/
    │   └── index.ts        # Cloudflare Worker
    ├── wrangler.toml
    └── package.json
```
