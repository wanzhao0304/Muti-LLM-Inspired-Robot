# Minimal Vercel Feishu Events Endpoint

部署后地址：`/api/feishu/events`

- GET  → 200 探活 JSON
- POST + {"challenge":"..."} → 原样返回 {"challenge":"..."}（飞书校验专用）

## 使用
1. 上传到 GitHub 仓库根目录。
2. Vercel 导入仓库并部署。
3. 打开：`https://<你的域名>.vercel.app/api/feishu/events` 自测。
4. 飞书事件订阅填写完整路径并保存完成校验。
