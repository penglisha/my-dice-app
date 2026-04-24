# 🎲 飞行棋骰子助手

语音触发的 3D 骰子。架构：国内用户 → Cloudflare Worker（代理）→ HF Space（SenseVoiceSmall）

```
浏览器 ──POST /transcribe──▶ Cloudflare Worker ──▶ HF Space /api/v1/asr
（国内可访问）                （透传，加 CORS）         （境外推理，无需梯子）
```

## 部署步骤

### 1. 准备 HF Space

在 Hugging Face 新建一个 **Docker Space**，上传 `app.py` 和 `Dockerfile`，等待构建完成（约 10～20 分钟），确认 Space 状态为 **Running**。

Space 地址格式：`https://你的用户名-sensevoice-api.hf.space`

### 2. 部署 Cloudflare Worker

```bash
cd worker
npm install

# 设置 HF Space 地址（交互式，不写入文件）
npx wrangler secret put HF_SPACE_URL
# 粘贴：https://你的用户名-sensevoice-api.hf.space

# 发布（含 Cron 心跳）
npm run deploy
```

部署成功后终端输出 Worker URL，格式：
```
https://dice-app-worker.<你的子域>.workers.dev
```

### 3. 配置前端 Worker URL

打开 `frontend/index.html`，找到顶部常量并替换：

```js
const WORKER_URL = 'https://dice-app-worker.YOUR_SUBDOMAIN.workers.dev';
```

### 4. 部署前端到 Cloudflare Pages

**方法 A — 拖拽上传（最简单）**

1. 打开 Cloudflare Pages Dashboard → Create a project → Direct Upload
2. 将 `frontend/` 目录拖入上传区域

**方法 B — 连接 Git 仓库**

- Build command：（留空）
- Build output directory：`frontend`

### 5. 首次使用前唤醒 HF Space

访问 `https://你的用户名-sensevoice-api.hf.space` 页面，确认 Space 已启动（免费版有冷启动延迟）。
Worker 的 Cron 任务每 20 分钟自动 ping 一次，缓解休眠问题。

## 本地开发

```bash
# Worker 本地调试
cd worker
npm run dev
# 默认监听 http://localhost:8787
# 需在 .dev.vars 文件中设置：HF_SPACE_URL=https://...

# 前端直接用浏览器打开 frontend/index.html
# 将 WORKER_URL 临时改为 http://localhost:8787
```

`.dev.vars` 示例（仅本地，勿提交）：
```
HF_SPACE_URL=https://你的用户名-sensevoice-api.hf.space
```

## 触发词

说出以下任意词语让机器人扔骰子：

> 你扔 / 轮到你 / 该你 / 到你了 / 你来 / 机器人扔 / 机器人你扔

## 注意事项

- HF Space 免费版推理延迟约 3～8 秒，冷启动更长
- Cron 心跳（每 20 分钟）可有效减少冷启动频率
- Worker 不需要 GROQ_API_KEY，可通过 `wrangler secret delete` 清理旧密钥

## 项目结构

```
my-dice-app/
├── frontend/
│   └── index.html          # 前端单文件（CSS 3D 骰子 + PCM→WAV 录音 + 语音识别）
└── worker/
    ├── src/
    │   └── index.ts        # Cloudflare Worker（透传代理 + Cron 心跳）
    ├── wrangler.toml        # 含 Cron 触发器配置
    └── package.json
```
